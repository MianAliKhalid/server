const validate = (schema) => async(req, res, next) => {
    try {
        const parseBody = await schema.parseAsync   (req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        console.log(error.errors);
        res.status(400).json({ error: error.errors[0].message });
        
    }
    }

module.exports = validate;