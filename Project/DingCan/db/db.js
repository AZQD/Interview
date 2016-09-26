/**
 * 数据库操作的总接口
 * 1.统一数据库操作的接口
 * 2.处理异常
 */
var userDao = require('./user_dao');
var feedbackDao = require('./feedback_dao');
var addressDao = require('./address_dao');
var bannerDao = require('./banner_dao');
var mealDao = require('./meal_dao');
var orderDao = require('./order_dao');

var db = {
    //1.user_dao.js
    addUser : function(phone, fn){
        userDao.addUser(phone, function(error, user){
            if(error){
                throw error;
            }else{
                fn(user);
            }
        });
    },

    getUserByPhone : function(phone, fn){
        userDao.getUserByPhone(phone, function(error, user){
            if(error){
                throw error;
            }else{
                fn(user);
            }
        });
    },

    //2.feedback_dao.js
    addFeedback : function(feedback, fn){
        feedbackDao.addFeedback(feedback, function(error, feedback){
            if(error){
                throw error;
            }else{
                fn(feedback);
            }
        });
    },

    //3.address_dao.js
    addAddr : function(address, fn){
        addressDao.addAddr(address, function(error, address){
            if(error){
                throw error;
            }else{
                fn(address);
            }
        });
    },

    getAddrsByUserId : function(userId, fn){
        addressDao.getAddrsByUserId(userId, function(error, userArr){
            if(error){
                throw error;
            }else{
                fn(userArr);
            }
        });
    },

    updateAddr : function(address, fn){
        addressDao.updateAddr(address, function(error, msg){
            if(error){
                throw error;
            }else{
                fn(msg);
            }
        });
    },

    deleteAddrById : function(id, fn){
        addressDao.deleteAddrById(id, function(error, msg){
            if(error){
                throw error;
            }else{
                fn(msg);
            }
        });
    },

    //banner_dao
    getBanners : function(fn){
        bannerDao.getBanners(function(error, banners){
            if(error){
                throw error;
            }else{
                fn(banners);
            }
        });
    },

    //meal_dao
    getMeals : function(fn){
        //meals 是一个数组
        mealDao.getMeals(function(error, meals){
            if(error){
                throw error;
            }else{
                fn(meals);
            }
        });
    },


    getDefaultAddr : function(userId, fn){
        addressDao.getDefaultAddr(userId, function(error, address){
            if(error){
                throw error;
            }else{
                fn(address);
            }
        });
    },

    addOrder : function(order, fn){
        orderDao.addOrder(order, function(error, order){
            if(error){
                throw error;
            }else{
                fn(order);
            }
        });
    },

    getOrderById : function(id, fn){
        orderDao.getOrderById(id, function(error, order){
            if(error){
                throw error;
            }else{
                fn(order);
            }
        });
    },

    getOrdersByUserId : function(userId, fn){
        orderDao.getOrdersByUserId(userId, function(error, orders){
            if(error){
                throw error;
            }else{
                fn(orders);
            }
        });
    }
};
module.exports = db;