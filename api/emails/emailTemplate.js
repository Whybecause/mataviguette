const fs = require('fs');
const hogan = require('hogan.js');
const inlineCss = require('inline-css');

exports.emailTemplate = async (header, message, buttonText, buttonLink) => {
    const templateFile =  fs.readFileSync('../api/emails/template/template.html', 'utf-8');
    const templateStyled = await inlineCss(templateFile.toString(), {url: "file://"+__dirname+"/template/"});
    const templateCompiled = hogan.compile(templateStyled);
    const templateRendered = templateCompiled.render({header, message, buttonText, buttonLink})
    return templateRendered;
}