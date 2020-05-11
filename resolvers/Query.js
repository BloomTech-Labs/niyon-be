//resolver to query the tech data
async function tech(_, __, context) {
    try {
        return await context.helpers.tech.getTech();
    } catch (e) {
        console.log(e)
    }
}
//resolver to query the location data
async function location(_, __, context) {
    try {
        return await context.helpers.location.getLocations();
    } catch (e) {
        console.log(e)
    }
}
//resolver to query the job titles
async function job_title(_, __, context) {
    try {
        return await context.helpers.job_title.getTitles();
    } catch (e) {
        console.log(e)
    }
}
//profile starter kit for client to grab all data and complete user profile
async function profileStart(_, __,context) {
    try {
        const locations = await context.helpers.location.getLocations();
        const jobs = await context.helpers.job_title.getTitles();
        const techs = await context.helpers.tech.getTech();
        //shape of returned data is an object of array-objects
        //each field holds an array of objects of the type the field name represents
        return {
            location: locations,
            job_title: jobs,
            tech_stack: techs
        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    tech,
    location,
    job_title,
    profileStart
}