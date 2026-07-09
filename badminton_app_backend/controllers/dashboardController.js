const DashboardModel = require('../models/dashboardModel');

class DashboardController {
    static getCounts(req, res) {
        console.log('📊 Dashboard API called');
        
        DashboardModel.getDashboardCounts((err, result) => {
            if (err) {
                console.error('❌ Dashboard error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to fetch dashboard data',
                    error: err.message
                });
            }

            res.json({
                success: true,
                data: result
            });
        });
    }

    static getDetailedStats(req, res) {
        DashboardModel.getDetailedStats((err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to fetch detailed stats',
                    error: err.message
                });
            }

            res.json({
                success: true,
                data: result
            });
        });
    }
}

module.exports = DashboardController;