exports.adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access required.",
        });

    }

    next();

};

exports.checkOwnership = (Model) => {

    return async (req, res, next) => {

        try {

            const document = await Model.findById(req.params.id);

            if (!document) {

                return res.status(404).json({
                    success: false,
                    message: "Resource not found.",
                });

            }

            if (
                !document.createdBy.equals(req.user._id) &&
                req.user.role !== "admin"
            ) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to perform this action.",
                });
            }

            req.document = document;
            next();

        }

        catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message,
            });

        }

    };

};