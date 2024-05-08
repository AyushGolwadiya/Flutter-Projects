const express = require('express');
const fs = require('fs');
const app = express();

app.get('/',function(req,res){
    res.send("Home page");
});

app.get('/notes',function(req,res){
    res.send("Notes page");
})

// Adding video on a page
app.get('/video', (req, res) => {
    const videoPath = 'C:/Users/ayush/Downloads/SaveInsta.App - 3152411657434898983.mp4';
    if (!fs.existsSync(videoPath)) {
        return res.status(404).send("video not found");
    }
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    res.writeHead(200, {
        'Content-type': 'video/mp4',
        'Content-length': fileSize
    });
    const videoStream = fs.createReadStream(videoPath);
    videoStream.pipe(res);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running');
});
