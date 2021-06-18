let values = [];

let size = 50;

let draw_graph = true;

// speed can be changed with selectors
let ms = 101;

// selector
let color_scheme;
let sort_method;

// start and end button vars
let begin_sort = false;
let stop_sort = false;
let is_sorting = false;
let is_sorted = false;

// starting colors; can be changed with selectors
let color_back;
let color_stroke;
let color_fill_1;
let color_fill_2;

function setup() {
  createCanvas(1201, 500); //1101

  console.log("create array with 'size' random values");
  values = new Array(size);
  for (let i = 0; i < values.length; i++)
    values[i] = random(height - 50);
  
  // make selectors
  make_sort_method_selector();
  make_color_selectors();

  // choose random color
  let random_color = int(random(0,9));
  color_scheme.selected(random_color);
  color_select_event();
  
  // set buttons begin, end, shuffle
  var startButton = createButton('Begin Sort!');
  startButton.mousePressed(set_begin_sort);

  var endButton = createButton('Stop');
  endButton.mousePressed(set_stop_sort);
  
  var shuffleButton = createButton('Shuffle');
  shuffleButton.mousePressed(set_shuffle);
}


function draw() {
  // draw initial graph
  if (draw_graph) {
    draw_entire_graph();
    draw_graph = false;
  }
  console.log("is_sorting: " + is_sorting);
  console.log("sort_method: " + sort_method.value());
  if (begin_sort && !is_sorting) {
    is_sorting = true;
    begin_sort = false;
    console.log("SORT");
    if (sort_method.value() == 0) {
      console.log("Bubble Sort Begins");
      bubble_sort();
    } else if (sort_method.value() == 1) {
      console.log("Selection Sort Begins");
      selection_sort();
    } else if (sort_method.value() == 2) {
      console.log("Insertion Sort Begins");
      insertion_sort();
    }
    noLoop(); // end
  }

  noLoop(); // end
}


function set_begin_sort() { 
  if (!is_sorting && !is_sorted) {
    console.log("BEGIN SORT TRUE");
    begin_sort = true;
    loop();
  } else {console.log("Begin Sort Ignored");}
}

function set_stop_sort() {
  if (is_sorting) {
    console.log("STOP SORT TRUE");
    stop_sort = true;
    is_sorted = false;
    loop();
  } else {console.log("Stop Sort Ignored");}
  
}

function set_shuffle() {
  set_stop_sort();
  is_sorted = false;
  console.log("SHUFFLE");
  for (let i = 0; i < values.length; i++)
    values[i] = random(height - 50);
  draw_entire_graph();
  loop();
}

function make_sort_method_selector() {
  // different sorting methods
  sort_method = createSelect();
  sort_method.selected("Bubble Sort", 0);
  sort_method.option("Bubble Sort", 0);
  sort_method.option("Selection Sort", 1);
  sort_method.option("Insertion Sort", 2);
}

function make_color_selectors() {
  // bar & background colors schemes
  color_scheme = createSelect();
  color_scheme.option("Ocean", 0);
  color_scheme.option("Orca", 1);
  color_scheme.option("Wireframe", 2);
  color_scheme.option("Piano", 3);
  color_scheme.option("Volcano", 4);
  color_scheme.option("Fruity", 5);
  color_scheme.option("Bubblegum", 6);
  color_scheme.option("Cotton Candy", 7);
  color_scheme.option("Jungle", 8);
  color_scheme.option("Olympic", 9);
  color_scheme.changed(color_select_event);

}

function color_select_event() {
  console.log("color_scheme value: " + color_scheme.value());
  // read color scheme value, assign colors
  if (color_scheme.value() == 0) { // Ocean 
    color_back = "#008"; // dark blue
    color_stroke = "#33F"; // blue
    color_fill_1 = "#4961E1"; // royal blue
    color_fill_2 = "#FF4500"; // blood orange
  } else if (color_scheme.value() == 1) { // Orca
    color_back = "#000"; // black
    color_stroke = "#D9D9D9"; // light gray
    color_fill_1 = "#FFF"; // white 
    color_fill_2 = "#CCC"; // mid gray
  } else if (color_scheme.value() == 2) { // Wireframe
    color_back = "#000"; // black
    color_stroke = "#0F0"; // green
    color_fill_1 = "#000"; // black
    color_fill_2 = "#080"; // dark green
  } else if (color_scheme.value() == 3) { // Piano
    color_back = "#FFF"; // white
    color_stroke = "#555"; // darker gray
    color_fill_1 = "#000"; // black
    color_fill_2 = "#888"; // dark gray
  } else if (color_scheme.value() == 4) { // Volcano
    color_back = "#801313"; // deep red
    color_stroke = "#662929"; // ash
    color_fill_1 = "#EB5121"; // orange
    color_fill_2 = "#FCB930"; // yellow
  } else if (color_scheme.value() == 5) { // Fruity
    color_back = "#4C00A4"; // grape purple
    color_stroke = "#00E500"; // lime green
    color_fill_1 = "#FFFF35"; // banana yellow
    color_fill_2 = "#F81818"; // apple red
  } else if (color_scheme.value() == 6) { // Bubblegum
    color_back = "#FFCCDD"; // light pink
    color_stroke = "#D53B81"; // dark rose
    color_fill_1 = "#FF44CC"; // neon pink
    color_fill_2 = "#FF99DD"; // rose
  } else if (color_scheme.value() == 7) { // Cotton Candy
    color_back = "#D9EBFF"; // sweet blue
    color_stroke = "#FFF"; // white
    color_fill_1 = "#FF82A9"; // sweet pink
    color_fill_2 = "#7AAEDB"; // corn
  } else if (color_scheme.value() == 8) { // Jungle
    color_back = "#135E62"; // brunswick green
    color_stroke = "#478966"; // deep aquamarine
    color_fill_1 = "#7EC656"; // leaf green
    color_fill_2 = "#6FA160"; // branchy green
  } else if (color_scheme.value() == 9) { // Olympic
    color_back = "#D6AF36"; // american gold
    color_stroke = "#A77044"; // metal bronze
    color_fill_1 = "#D7D7D7"; // light silver
    color_fill_2 = "#FEE411"; // bright gold
  }
  draw_entire_graph();
}


function draw_entire_graph() {
  background(color_back);
  for (let n = 0; n < values.length; n++) { 
    strokeWeight(2);
    fill(color_fill_1);
    stroke(color_stroke);
    rect(13*n + 5, height, 10, -values[n]);
  }
}


// the sort
async function bubble_sort() {
  outerloop:
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      // check if left > right to determine swap
      if (values[j] > values[j + 1])
      {
        await swap(values, j, j + 1);

        // un-highlight values
        redraw_rect(prev_j, color_fill_1);
        redraw_rect(prev_j +1, color_fill_1);

        // check if pause
        if (stop_sort) {
          redraw_rect(j, color_fill_1);
          redraw_rect(j+1, color_fill_1);
          break outerloop;
        }
         
        // highlight j and j+1 values
        redraw_rect(j, color_fill_2);
        redraw_rect(j+1, color_fill_2);
        var prev_j = j;
      }

    }
  }

  // check if stop_sort
  if (!stop_sort) {
    // un-highlight values
    redraw_rect(prev_j, color_fill_1);
    redraw_rect(prev_j +1, color_fill_1);
    is_sorted = true;
  }

  // reset start val
  is_sorting = false;
  stop_sort = false;

}


// the sort
async function selection_sort() {
  var min_j = height, i, j;

  outerloop: // sort in a rightward motion
  for (i = 0; i < values.length - 1; i++) {
    min_j = i;
    await sleep(ms).then(() => { console.log(); });

    // un-highlight prev swap values
    redraw_rect(i - 1, color_fill_1);
    redraw_rect(prev_j, color_fill_1);

    // check if pause
    if (stop_sort) 
      break;

    redraw_rect(min_j, color_stroke); // highlight potential smallest value

    for (j = i + 1; j < values.length; j++) {
      // check if current j is less than smallest element i
      if (values[j] < values[min_j]) {
        await sleep(ms).then(() => { console.log(); }); 
        // unhighlight potential smallest value 
        redraw_rect(min_j, color_fill_1); 
        // check if pause
        if (stop_sort) 
          break outerloop;
        min_j = j;
        // highlight potential smallest value
        redraw_rect(min_j, color_stroke);
      }
         
    }

    await swap(values, min_j, i)
    // check if pause
    if (stop_sort) {
      redraw_rect(min_j, color_fill_1);
      redraw_rect(i, color_fill_1);
      break outerloop;
    }

    // highlight j value
    redraw_rect(i, color_fill_2);
    redraw_rect(min_j, color_fill_2);
    var prev_j = min_j;

  }

  // check if stop_sort
  if (!stop_sort) {
    // un-highlight values
    redraw_rect(prev_j, color_fill_1);
    redraw_rect(i-1, color_fill_1);
    is_sorted = true;
  }

  // reset start val
  is_sorting = false;
  stop_sort = false;
}


// the sort
async function insertion_sort() {
  var prev_j, i, j;

  outerloop: // sort in a rightward motion
  for (i = 1; i < values.length ; i++) {
    rightmost = values[i];
    // check all values left of rightmost
    for (j = i - 1; j >= 0; j--) {
      if (values[j] > rightmost) {
        await swap(values, j+1, j);
        // unhighlight
        redraw_rect(prev_j+1, color_fill_1);
        redraw_rect(prev_j, color_fill_1);
        // check if pause
      if (stop_sort) {
        // unhighlight draw
        redraw_rect(j+1, color_fill_1);
        redraw_rect(j, color_fill_1);
        break outerloop;
      }
        // highlight
        redraw_rect(j+1, color_fill_2);
        redraw_rect(j, color_fill_2);
        prev_j = j;
      } else break;
    }
  }

  // check if stop_sort
  if (!stop_sort) {
    // unhighlight
    redraw_rect(prev_j+1, color_fill_1);
    redraw_rect(prev_j, color_fill_1);
    is_sorted = true;
  }

  // reset start val
  is_sorting = false;
  stop_sort = false;
}


function redraw_rect(idx, new_color) { 
  // clear
  strokeWeight(2);
  fill(color_back);
  stroke(color_back);
  rect(13*idx + 5, height, 10, -height);
  // new color
  fill(new_color);
  stroke(color_stroke);
  rect(13*idx + 5, height, 10, -values[idx]);
}


async function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;

  await sleep(ms).then(() => { console.log(); });
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// stop function
// shuffle func must stop running, 
//because bubbe sort has -i and such and a 
//small element will get stuck at end

// if sorted, dont sort
