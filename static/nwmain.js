var isNode=(typeof process !=="undefined");
if (isNode){
	window.node_modules={fs:require("fs"),buffer:require("buffer")};
}
