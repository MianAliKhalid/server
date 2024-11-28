const mongoose = require('mongoose');
const Service = require('../Models/service-model');




const services = async(req, res) => {
    try {
        const response = await Service.find();
        if(!response) { 
            return res.status(400).json({msg: 'No service found'});
        }
        res.status(200).json( response);

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Single Servide
const singleservice = async (req, res) => {
    try {
      const serviceId = req.params.id;
  
      const service = await Service.findById(serviceId);
  
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      res.status(200).json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

module.exports = {
    services,
    singleservice
};