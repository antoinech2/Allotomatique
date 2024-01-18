import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Function to get the form of a given url
 * @param {*} url 
 */
export function scrapForm(url) {
    return axios.get(url)
        .then((response) => {
            // Load the HTML content into Cheerio
            const $ = cheerio.load(response.data);

            // Getting the form
            let form = $('form');

            form = changeFormTarget(form, url);

            return $.html(form);   
        }).catch((error) => {
            console.log('Error fetching the webpage:', error);
        });
}

/**
 * Given a cheerio form object, it will change the action attribute to match the targeted website.
 * In other words, in case the action attribute of the form is a relative URL, this function will change it to an absolute URL to ensure the form is submitted to the right website.
 * @param {*} form 
 * @param {*} domain 
 */
export function changeFormTarget(form, url) {
    // Getting the action attribute of the form
    const action = form.attr('action');

    // If the action attribute is a relative URL
    if (action.startsWith('/')) {
        // Change the action attribute to an absolute URL
        form.attr('action', url + action);
    } else if (action.startsWith('http')) {
        // If the action attribute is already an absolute URL, do nothing
    } else {
        // The action attribute may be a relative URL, but not starting with a slash, we need to know if we manually need to add a slash or not
        // We will check if the URL ends with a slash
        if (url.endsWith('/')) {
            // If the URL ends with a slash, we don't need to add a slash
        } else {
            // If the URL does not end with a slash, we need to add a slash
            url += '/';
        }
        form.attr('action', url + action);
    }

    return form;
}