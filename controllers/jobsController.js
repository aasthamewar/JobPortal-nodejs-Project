import jobsModel from "../models/jobsModel.js"
import mongoose from "mongoose";
import moment from "moment";
//==============CREATE JOBS===================
export const createJobController = async(req,res,next) =>{
    const {company,position} = req.body
    if(!company || !position){
        next('Please Provide All Field')
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({job})
};

//===============GET JOBS=====================
export const getAllJobsController = async(req,res,next) =>{
    const {status,workType,search,sort} = req.query;
    //condition for searching filters
    const queryObject = {
        createdBy: req.user.userId,
    }
    //logic filter
    if(status && status!=='all'){
        queryObject.status=status
    }
    if(workType && workType !=='all'){
        queryObject.workType=workType;
    }
    if(search){
        queryObject.position={$regex: search, $options:'i'}
    }
    let queryResult = jobsModel.find(queryObject)

    //sorting
    if(sort === 'latest'){
        queryResult=queryResult.sort('-createdAt')
    }
    if(sort === 'oldest'){
        queryResult=queryResult.sort('createdAt')
    }
    if(sort === 'a-z'){
        queryResult=queryResult.sort('position')
    }
    if(sort === 'z-a'){
        queryResult=queryResult.sort('-position')
    }
    
    //pagination
    const page=Number(req.query.page)||1
    const limit =Number(req.query.limit)||10
    const skip=(page-1)*limit

    queryResult=queryResult.skip(skip).limit(limit)
    //jobs cnt
    const totalJobs=await jobsModel.countDocuments(queryResult)
    const numOfPage =Math.ceil(totalJobs/limit)


 

    const jobs = await queryResult;
    // const jobs = await jobsModel.find({createdBy:req.user.userId});

    res.status(200).json({
        totalJobs,
        jobs,
        numOfPage,
    })
};


//==============UPDATE JOBS=====================
export const updateJobController = async(req,res,next) => {
    const {id}=req.params
    const {company,position} = req.body
    //validation
    if(!company || !position){
        next('Please Provide All Field')
    }
    //find job
    const job = await jobsModel.findOne({_id:id})
    //validation
    if(!job){
        next(`no jobs found with this id ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){ 
        next('Your are Not Authorized to update this job')
        return ;
    }
    const updateJob = await jobsModel.findOneAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })
    //res
    res.status(200).json({updateJob});

};

//===================DELETE JOB=========================

export const deleteJobController =async(req,res,next) =>{
   const {id} = req.params
   //find job
   const job = await jobsModel.findOne({_id:id})
   //validation
   if(!job){
    next(`No Job Found with this ID ${id}`)
   }
   if(!req.user.userId === job.createdBy.toString()){
    next('Your are Not Authorized to Delete this job')
    return;
   }

   await job.deleteOne()
   res.status(200).json({message:"Success, Job Deleted!"});
}


//===================JOB STATS & FILTER===================

export const jobStatsController = async (req,res,next)=>{
    const stats = await jobsModel.aggregate([
        //search by user jobs
        {
           $match: {
            createdBy: new mongoose.Types.ObjectId(String(req.user.userId))
           },
           
        },
        {
            $group:{
            _id:'$status',
           count:{ $sum:1 },
            }
        }
    ])

    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    //monthly yearly stats
    let monthyApplication = await jobsModel.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(String(req.user.userId))
            }
        },
        {
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month: '$createdAt'},
                },
                count:{
                    $sum:1
                }
            }
        }
    ])

    monthyApplication=monthyApplication.map(item => {
        const {_id:{year,month},count}=item
        const date = moment().month(month-1).year(year).format('MMM Y')
        return {date,count}
    }).reverse();
    res.status(200).json({ totalJobs: stats.length,defaultStats,monthyApplication});
};


