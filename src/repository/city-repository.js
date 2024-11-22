const { Op }= require('sequelize');

const {City}= require('../models/index'); // index file returns all the corresponding models that we put in models package


class CityRepository {
    async createCity({ Name }) {
        try {
            const city= await City.create({ Name });
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer.");
            throw {error};
        }
    }
    async createCities({ Names }) {
        try {
            const cities= await City.bulkCreate(
                Names.map(name => ({Name: name}))
             );
            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer.");
            throw {error};
        }
    }
    
    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer.");
            throw {error};
        }
    }

    async updateCity(cityId, data) {
        try {
            //The below approach also works but won't return the updated object
            // const city = await City.update(data, {
            //     where: {
            //         id: cityId
            //     }
            // });
            //Follwing approach returns the updated object
            const city = await City.findByPk(cityId);
            city.Name=data.Name;
            await city.save();
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer.");
            throw {error};
        }
    }

    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong in the repository layer.");
            throw {error};
        }
    }
    async getAllCities(filter) {
        try {
            if(filter.Name) {
                const cities=await City.findAll({
                    where : {
                        Name: {
                            [Op.startsWith] : filter.Name
                        }
                    }
                });
                return cities;
            }
            const cities= await City.findAll();
            return cities;
        } catch (error) {
            console.log("Something went wrong in the repository layer.");
            throw {error};
        }
    }
    
}

module.exports = CityRepository;