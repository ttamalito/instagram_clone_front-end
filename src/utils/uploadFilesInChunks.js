/**
 * Uploads an array of files to the given url in chunks of the corresponding size
 * And redirects the user once all the files have been uploaded
 * @param {String} url
 * @param {[File]} files
 * @param {number} chunkSize In bytes
 * @return {Promise<void>}
 */
export default async function uploadFilesInChunks(url, files, chunkSize) {
    //console.log(`we are about to send the files`)
    // create a variable with the amount of files to be sent
    let amountOfFiles = files.length;
    // iterate through all the files
    for (let i = 0; i < files.length; i++) {
        // create a fileReader
        const fileReader = new FileReader();

        // add the event listener to know when the file was read
        fileReader.addEventListener('load', async e => {
            // the file finished loading, when the event is triggered
            // upload it to the server
            const amountOfChunks = fileReader.result.byteLength/chunkSize;
            // generate a unique id for the file
            const fileName = `${Date.now()}-${Math.random() * 1000}-${files[i].name}`;
            console.log(`the file name: ${fileName}`)
            // loop through all the chunks
            for (let j = 0; j <= amountOfChunks; j++) {
                const dataToTransfer = fileReader.result.slice(j * chunkSize, chunkSize * (j+1));
                // send the post request
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            "Content-Type": 'application/octet-stream',
                            "Content-Length": dataToTransfer.byteLength,
                            "File-Name": fileName,
                            "mime-type": `${files[i].type}`
                        },
                        body: dataToTransfer
                    });
                    //console.log(response)
                    //console.log(`After sendin a post request and getting the response: ${Date.now()}`)
                } catch (error) {
                    console.log(error);
                }


            } // here ends for loop for the chunks
            //console.log(`After sending all the chunks: ${Date.now()}`)
            // after sending the file, check if this one was the last file to be sent
            amountOfFiles = amountOfFiles -1;
            if (amountOfFiles === 0) {
                // we have sent all the files
                //console.log(`We have sent all the files: ${Date.now()}`);
                // we can redirect now
                window.location.href = '/';
            }
        }) // end of eventListener
        // start reading the file as an array buffer (basically an array of bytes)
        fileReader.readAsArrayBuffer(files[i]);
    } // end of for loop
   // console.log(`After reading all the files in uploadFilesInchunks: ${Date.now()}`);
} // end of uploadFilesInChunks