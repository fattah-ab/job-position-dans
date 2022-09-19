const axios = require('axios');
const JOB_URL = process.env.JOB_URL;
const log = require('../helpers/log');
const response = require('../helpers/response')

class JobPositionController {
    static async getJobPosition(req, res, next) {
        try {
            const job = await axios.get(`${JOB_URL}`)

            log.info(req.clientIp + ' - ' + 'Success Access Api getJobPosition');
            res.status(200).json(response.successRes("Success retrive Job Position list", job.data));

        } catch (err) {
            log.error(err + " - Api getJobPosition")
            next(err)
        }
    }

    static async getJobPositionPage(req, res, next) {
        try {
            const jobFind = await axios.get(`${JOB_URL}`)

            const { page } = req.query;
            const limit = 5;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const result = jobFind.data.slice(startIndex - endIndex)
            
            const job = {
                pages: Math.ceil(jobFind.data.length / limit),
                curent: page,
                data: result
            }

            log.info(req.clientIp + ' - ' + 'Success Access Api getJobPositionPage');
            res.status(200).json(response.successRes("Success retrive Job Position list page", job));

        } catch (err) {
            log.error(err + " - Api getJobPositionPage")
            next(err)
        }
    }

    static async getDetailJobPosition(req, res, next) {
        try {
            const { id } = req.params;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            for(let i = 0; i < job.data.length; i++) {
                if(id === job.data[i].id){
                    detail.push(job.data[i])
                    break;
                }
            }
            
            log.info(req.clientIp + ' - ' + 'Success Access Api getDetailJobPosition');
            res.status(200).json(response.successRes("Success retrive Job Position by Id", detail[0]));

        } catch (err) {
            log.error(err + " - Api getDetailJobPosition")
            next(err)
        }
    }

    static async getJobPositionByDescription(req, res, next) {
        try {
            const { desc } = req.query;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            job.data.forEach(element => {
                if((new RegExp(desc, 'i')).test(element.description)){
                    detail.push(element)
                }
            });

            log.info(req.clientIp + ' - ' + 'Success Access Api getJobPositionByDescription');
            res.status(200).json(response.successRes("Success retrive Job Position by Description", detail));

        } catch (err) {
            log.error(err + " - Api getJobPositionByDescription")
            next(err)
        }
    }

    static async getJobPositionByLocation(req, res, next) {
        try {
            const { loc } = req.query;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            job.data.forEach(element => {
                if((new RegExp(loc, 'i')).test(element.location)){
                    detail.push(element)
                }
            });

            log.info(req.clientIp + ' - ' + 'Success Access Api getJobPositionByLocation');
            res.status(200).json(response.successRes("Success retrive Job Position by Location", detail));

        } catch (err) {
            log.error(err + " - Api getJobPositionByLocation")
            next(err)
        }
    }

    static async getJobPositionByTitle(req, res, next) {
        try {
            const { title } = req.query;
            const job = await axios.get(`${JOB_URL}`)

            let detail = [];

            job.data.forEach(element => {
                if((new RegExp(title, 'i')).test(element.title)){
                    detail.push(element)
                }
            });

            log.info(req.clientIp + ' - ' + 'Success Access Api getJobPositionByTitle');
            res.status(200).json(response.successRes("Success retrive Job Position by Title", detail));

        } catch (err) {
            log.error(err + " - Api getJobPositionByTitle")
            next(err)
        }
    }
}

module.exports = JobPositionController;
