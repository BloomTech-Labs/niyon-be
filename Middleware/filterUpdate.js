function filterUpdate() {
    return (req, res, next) => {
        try {
            let filter;
            if (req.params.filter === 'tech') {
                filter = 'tech'
            } else if (req.params.filter === 'location') {
                filter = 'location'
            } else if (req.params.filter === 'job') {
                filter = 'job_title'
            } else if (req.params.filter === 'bio') {
                filter = 'bio'
            } else if (req.params.filter === 'first_name') {
                filter = 'first_name'
            }
        } catch (e) {
            console.log(e);
            next();
        }
    }
}

module.exports = filterUpdate;