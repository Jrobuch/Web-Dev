// John Obuch, jo559@drexel.edu
// CS530: 14382376, Assignment 3

function Grapher() {

    const that = this;

    this.build = function(parentID){

        //empty the <div></div> within the .html file by selecting the id (note: $ = select)
        $(parentID).empty();

        //define the canvas using html
        const myCanvas = $(`
        <div class="content">
            <div class="container center-block">
                <div class="row justify-content-center mt-3">
                    <div class="canvas-container">
                        <canvas id="canvas" width="770" height="490" style="border:1px solid #000000;">
                        </canvas>
                        <center>
                            <div class="canvas-dialog mt-3">
                                y = 
                                <input id="x3-coeff" class='coeff' type="text" name="x3coeff" size="2"> x<sup>3</sup> + 
                                <input id="x2-coeff" class='coeff' type="text" name="x2coeff" size="2"> x<sup>2</sup> + 
                                <input id="x1-coeff" class='coeff' type="text" name="x1coeff" size="2"> x +
                                <input id="x0-coeff" class='coeff' type="text" name="x0coeff" size="2">
                            </div>
                        </center>
                    </div>
                </div>
             </div>
        </div>
        `);

        //mouseover for capturing the x,y coordinates
        $(myCanvas).find('#canvas').mousemove(function(event) {
            //selecting and grabing the user input coefficient values
            var x3cstring = $('#x3-coeff').val();
            var x2cstring = $('#x2-coeff').val();
            var x1cstring = $('#x1-coeff').val();
            var x0cstring = $('#x0-coeff').val();

            var pix = 35
            var mouseX = (event.offsetX-pix*11)/pix;

            //calling the get_mouseY function to compute the y-coordinate based on the mouses given x-coordinate
            that.get_mouseY(mouseX, x3cstring,x2cstring,x1cstring,x0cstring)
            
        }); //closes mousemove function

        //appending the html to the canvas
        $(parentID).append(myCanvas)

        //call the draw the function to draw the grid
        draw()

        that.update('','','','') //draw the original line on page load for x=0 (i.e., all coefficients are empty '')

        //select and grab the user input coefficient values on keyup
        $('.coeff').keyup(function (){

            var x3cstring = $('#x3-coeff').val();
            var x2cstring = $('#x2-coeff').val();
            var x1cstring = $('#x1-coeff').val();
            var x0cstring = $('#x0-coeff').val();

            that.update(x3cstring,x2cstring,x1cstring,x0cstring) //feed the values into the update function
        });

    } //this bracket closes off the build()

    this.update = function(x3cstring, x2cstring, x1cstring, x0cstring) {

        //call the draw function to draw the grid
        draw()

        var coeff_list = ['','','','']; //initialize the coefficient list
        
        //assign the index positions of the coefficient list to be the values of the coefficient inputs
        coeff_list[0] = x3cstring;
        coeff_list[1] = x2cstring;
        coeff_list[2] = x1cstring;
        coeff_list[3] = x0cstring; 

        var pix = 35;

        // if the value of the cooeficient input is blank, assign its value to zero
        for (var i = 0; i < coeff_list.length; i++) {
            if (coeff_list[i] == '') {
            coeff_list[i] = 0;
            }
            else {
            coeff_list[i] = parseFloat(coeff_list[i]);
            }
        }

        //define a range function that creates a list of values based on functin input domain and optional step size
        function range(start, stop, step) { // source used: http://underscorejs.org/#range
            var a = [start], b = start;
            while (b < stop) {
                a.push(b += step || 1); //append in incriments of step size otherwise step size default is 1 unit value
            }
            return a;
        }

        //create the x list domain values and initialize the y list
        var x_list = range(-10, 10, 0.1) 
        var y_list = [];

        //for each x-value, compute the associated y-value
        for (var i = 0; i <= x_list.length; i++) {
            
            var y = coeff_list[0]*Math.pow(x_list[i],3) 
            + coeff_list[1]*Math.pow(x_list[i],2) 
            + coeff_list[2]*Math.pow(x_list[i],1)
            + coeff_list[3]*Math.pow(x_list[i],0);

            y_list.push(y); //append the results to the list
        }

        // draw/plot the graph
        for (var i = 0; i < y_list.length; i++) { 
        
            var c = document.getElementById("canvas");
            var ctx = c.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(x_list[i]*pix, y_list[i]*-pix);
            ctx.lineTo(x_list[i+1]*pix, y_list[i+1]*-pix);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.closePath()
        }
    } // this bracket closes update() function

    //define function that draws the canvas grid
    function draw(){
        
        //initialize constants and variable values
        const numRows = 13;
        const numCols = 21;
        var pix = 35;

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0); //identity mapping/transform for clearing the canvas since we mapped the canvas origin to the grid origin using ctx.translate()
        ctx.clearRect(0, 0, 770, 490); //clears the canvas

        // for loop to draw the grid horizontal lines for the x
        for (var row = 0; row < numRows; row++) {

            if (row == 6) {// if it's row 6 (i.e., the horizontal origin location make the line black)
                ctx.beginPath();
                ctx.moveTo(pix, row*pix+pix);
                ctx.lineTo(numCols*pix, row*pix+pix);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.closePath();
            }
            else {  // make all other lines on the horizontal gray
                ctx.beginPath();
                ctx.moveTo(pix, row*pix+pix);
                ctx.lineTo(numCols*pix, row*pix+pix);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'gray';
                ctx.stroke();
                ctx.closePath();
            }   
        }

        // for loop to draw the grid verticle lines for the y-axis
        for (var col = 0; col < numCols; col++) {

            if (col == 10) {// if it's col 10 (i.e., the virticle origin location make the line black)
                ctx.beginPath();
                ctx.moveTo(col*pix+pix, pix);
                ctx.lineTo(col*pix+pix,numRows*pix);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.closePath();
            }

            else{ // make all other lines on the virticle gray
                ctx.beginPath();
                ctx.moveTo(col*pix+pix, pix);
                ctx.lineTo(col*pix+pix,numRows*pix);
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'gray';
                ctx.stroke();
                ctx.closePath();
            }
        }

        //maps the canvas origin to the grid origin
        ctx.translate(11*pix,7*pix); //source leveraged for mapping: https://usefulangle.com/post/19/html5-canvas-tutorial-how-to-draw-graphical-coordinate-system-with-grids-and-axis#:~:text=Each%20line%20is%20separated%20by%20the%20grid%20size,canvas%20element%20in%20terms%20of%20no%20of%20grids.

        // For loop plot/draw x-labels
        var x = 0;
        for (var lab = -10; lab <= 10; lab++) {
            ctx.font = "12px Helvetica";
            ctx.fillStyle = 'gray';
            ctx.fillText(lab, x*pix-10*pix-5, 13);
        x += 1;
        }

        // For loop to plot/draw y-labels
        var y = 0;
        for (var lab = 6; lab >= -6; lab--) {
            ctx.font = "12px Helvetica";
            ctx.fillStyle = 'gray';
            ctx.fillText(lab, -13, y*pix-6*pix+5);
        y += 1;
        }

    } //this bracket closes draw() function

    //define a function that plots the x,y coordinates on the graph
    this.get_mouseY = function(mouseX, x3cstring, x2cstring, x1cstring, x0cstring){
       
        //call the update function so that the cordinates update at each point on the graph
        that.update(x3cstring, x2cstring, x1cstring, x0cstring)

        var mouseX = mouseX
        var pix = 35;

        // Inititialize the coeff list
        var coeff_list = ['','','',''];

        //assign the list index positions with the coefficient input values
        coeff_list[0] = x3cstring;
        coeff_list[1] = x2cstring;
        coeff_list[2] = x1cstring;
        coeff_list[3] = x0cstring; 

        // if the value of the cooeficient input is blank, assign its value to zero
        for (var i = 0; i < coeff_list.length; i++) {
            if (coeff_list[i] == '') {
                coeff_list[i] = 0;
            }
            else {
                coeff_list[i] = parseFloat(coeff_list[i]);
            }
        }
        //compute the y position on the graph with respect to the mouses x coordinate
        var mouseY = coeff_list[0]*Math.pow(mouseX,3) 
        + coeff_list[1]*Math.pow(mouseX,2) 
        + coeff_list[2]*Math.pow(mouseX,1)
        + coeff_list[3]*Math.pow(mouseX,0);

        //round the x,y cordinates of the mouse to two decimal places
        mouseY = Number(Math.round((mouseY) +'e2')+'e-2')
        mouseX = Number(Math.round((event.offsetX-pix*11)/pix +'e2')+'e-2');

        //define the width and hight of the rectangle
        var Rec_width = 2*pix;
        var Rec_height = 0.5*pix;

        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        
        //draw the green rectangle with the x,y coordinates of the upper left of the rectangle
        //being positioned at the point on the graph
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.lineWidth = 1;
        ctx.fillStyle = "green";
        ctx.fillRect(mouseX*pix, mouseY*-pix, Rec_width, Rec_height);
        ctx.stroke();   
        ctx.closePath();  

        //draw the x,y coordinates inside the green rectangle
        ctx.beginPath();
        ctx.font = "12px Helvetica";
        ctx.fillStyle = "white";
        ctx.fillText(String(mouseX) + ", " + String(mouseY), mouseX*pix+5, mouseY*-pix+13);
        ctx.closePath();
    } //this bracket closes off the get_mouseY() function

} //this bracket closes off the Grapher() class
