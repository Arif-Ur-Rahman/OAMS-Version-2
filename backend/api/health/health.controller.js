/**
 * @author [Anas]
 * @email [anas@uxd.co.jp]
 * @create date 2021-10-26 00:12:27
 * @modify date 2021-10-26 00:12:27
 * @desc [description]
 */
const {
    notifyMonthlyCheck,
    assetHealthInfo


} = require("./health.service");




module.exports = {

    notifyMonthlyCheck: (req, res) => {
        const body = req.body;
        notifyMonthlyCheck(body, (error, results, fields) => {
            if (error==null) {
                return res.json({
                    success: 0,
                    message: fields,
                })
            }
           // console.log("Controller field", fields);
            return res.json({
                success: 1,
                message: fields,
                data: results
            })
        })
    },

    assetHealthInfo: (req, res) => {
        const body = req.body;
        assetHealthInfo(body, (error, results) => {
            if (!results) {
                return res.json({
                    success: 0,
                    message: "health info not updated",

                })
            }
            return res.json({
                success: 1,
                message: "health info updated",

            })
        })
    },

}