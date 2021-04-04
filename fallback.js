const {accessibleImage} = require('./validate');

//at-least return these
const mandatory_tags = ["title", "description", "url", "image"];

//In case not found in tags
const fallback = (ogObject, $, url) => {
    mandatory_tags.forEach(tag => {
        if (!ogObject[tag] || !ogObject[tag].length > 0) {
            switch (tag) {
                case "title":
                    ogObject[tag] = getTitle($);
                    break;
                case "description":
                    ogObject[tag] = getDescription($);
                    break;
                case "url":
                    ogObject[tag] = getDomain($, url);
                    break;
                case "image":
                    ogObject[tag] = getImages($);
                    break;
                default:
                    break;
            }
        }
    });
    return ogObject;
}


const getTitle = ($) => {
    //getting Meta Title Tag
    let meta_title = $('meta[name="title"]').attr("content");
    if (meta_title != null && meta_title.length > 0) {
        return meta_title;
    }
    //getting Title Tag
    let doc_title = $('title').text();
    if (doc_title != null && doc_title.length > 0) {
        return doc_title;
    }
    //getting First Heading Tag
    let heading = $('h1').first().text();
    if (heading && heading.length > 0) {
        return heading;
    }
    //if noting works
    return "Not Found";
}

const getDescription = ($) => {
    //getting Meta Description Tag
    let mata_description = $('meta[name="description"]').attr("content");
    if (mata_description != null && mata_description.length > 0) {
        return mata_description;
    }
    //getting first paragraph
    let first_paragraph = $('p').first().text();
    if (first_paragraph != null && first_paragraph.length > 0) {
        return first_paragraph;
    }
    //getting first  sub-heading
    let first_heading = $('h2').first().text();
    if (first_heading != null && first_heading.length > 0) {
        return first_heading;
    }
    //what kind of website is this
    return "Not Found";
}

const getDomain = ($, url) => {
    //looking for links
    let canonical_link = $('link[rel="canonical"]').attr('href');
    if (canonical_link != null && canonical_link.length > 0) {
        return canonical_link;
    }
    //already you have
    return url;
}

const getImages = ($) => {
    //searching Img tag
    let first_image = $('img').first().attr('scr');
    if (first_image != null && first_image.length > 0 && accessibleImage(first_image)) {
        return first_image;
    }

    //looking for an icon link
    let Icon_image = $('link[type^="image"]').first().attr('href');
    if (Icon_image != null && Icon_image.length > 0 && accessibleImage(Icon_image)) {
        return Icon_image;
    }

    //camera conscious
    return "Not Found";
}

module.exports = fallback;
