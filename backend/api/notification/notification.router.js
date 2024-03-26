/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:11:53
 * @modify date 2021-10-26 00:14:36
 * @desc [description]
 */
const { 
    showNotificationTable,
    notificationSeen
}= require("./notification.controller");
const router = require("express").Router();


router.post("/showNotificationTable",showNotificationTable);
router.post("/notificationSeen",notificationSeen);



module.exports = router;