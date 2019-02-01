const fs = require ('fs');
const request = require('request');
const cheerio = require('cheerio');

const colors = require('colors');




const aa = fs.readFileSync('./exercise/websites.csv', 'utf8').split('\n');


const view = (source) => {
    const $ = cheerio.load(source);
    
    $('script').each((index, element) => {
    
        const src = $(element).attr('src');
        const alt = String(src)
        // console.log(src);

        if (src !== undefined){
            console.log(alt);
            return console.log((alt.match(/.js/g) || []).length)  
        }

        // const parsedHTML = $.load(source)
        // const p =  parsedHTML('script').get()[0].attribs['src']
        // console.log(p);
        // console.log((p.match(/.js/g) || []).length)
    });
}


for (let i = 0; i < aa.length; i++){
    
    const r = aa[i].split(",");

    // console.log(r);
    
    
    if (r[1].startsWith('https')) {
        
        request(r[1], (error, response, html) => {
            if (!error && response.statusCode == 200) {
                console.log(`\n\n\nWebsite name: ${aa[i]}`);
                console.log(`\nThe size of ${r[1]} is ${Buffer.byteLength(html)} bytes`.green);
                
                console.log('\nThe dependencies are: \n'.underline);

                view(html);        
                                
            }
            
        });
    } else {
        const stats = fs.statSync(r[1]);
        const fileSizeInBytes = stats["size"];

        console.log(`\n\n\nWebsite name: ${aa[i]} \n`);
        console.log(`The size of ${r[0]} is ${fileSizeInBytes} bytes`.green);

        console.log('\nThe dependencies are: \n'.underline);
        
        view(fs.readFileSync(r[1]));
        
      
    }


}





   