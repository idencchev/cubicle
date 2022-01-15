const handlebars = require('express-handlebars');
// Handlebars helper function for 'selected' HTML attribute
module.exports = () => {
    const hbs = handlebars.create({});
    hbs.handlebars.registerHelper("select", (value, options) => {
        return options.fn(this)
            .split('\n')
            .map((v) => {
                const t = 'value="' + value + '"'
                return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
    });
};
