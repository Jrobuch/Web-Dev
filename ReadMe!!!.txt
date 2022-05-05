To Run The Script:

Unzip the a3_submission file. Naviage to the /a3 directory.

Double click on the 'index.html' file.

This will open up and render the UI in your browser (your local file path will populate as the URL within the browser where the file is stored).

As a user, you can simply input your desired coefficients into the equation
provided below the grid. This will update the Function Grapher visualization
and produce the n-order polynomial graph based on your input. 

Note: The graph will only visually show curve elements depending on your coefficient inputs
that fall within the domain bounded by (-10,10) and range of (-6,6). Also, please note that
this function grapher only supports polynomials up to order n=3.

To interact and observe specific points that fall on the curve, simply navigate your
mouse curser along any position of the canvas grid within the domain of the graph
and the coresponding (x,y) coordinates will populate with the green box.

Observation:
Note that Javascript indexes at 0.
One unit of the mouse movement incriments/decriments the x=value in the hundredths position by by 0.03 units up until unit 9
at which point the the x-value in the hundreths position increment/decriment delta changes to 0.02 units upon turning over to the next 
ordinal number leading the decimal point. (e.g., 0.26,.029,.031, 0.34, 0.37, 0.39, .041, ...). 
I hypothesize that this is due to the machine trying to optimize the step size based on the number of pixels 
available within the 35 pixel width tick marks representing 1 unit in the x-direction. 
We also observe the same effect on the y-value component but with different unit deviations depending on the function coefficients. 

~ John Obuch