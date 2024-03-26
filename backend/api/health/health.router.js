/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:31
 * @modify date 2021-10-26 00:12:31
 * @desc [description]
 */
const {
     notifyMonthlyCheck,
     assetHealthInfo,

} = require("./health.controller");
const router = require("express").Router();

router.post("/notifyMonthlyCheck", notifyMonthlyCheck);
router.post("/assetHealthInfo", assetHealthInfo);


module.exports = router;