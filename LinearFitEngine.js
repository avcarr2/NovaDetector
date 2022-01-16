/* Linear fit engine for galaxy detection
 *
 */
# define DEFAULT_OUTPUT_EXTENSION ".xisf"

LinearFitEngine(){
   // Define the views or file to analyze.
   this.inputFiles = new Array;
   this.image1 = "";
   this.image1Window = null;
   this.image1View = null;
   this.image2 = "";
   this.image2Window = null;
   this.image2View = null;

   // output file handling
   this.outputDirectory = "";
   this.outputSuffix = "_subtracted";
   this.overwriteExisting = false;
   this.outputFormat = null;
   // Linear fit options
   this.rejectLow = 0.00000;
   this.rejectHigh = 0.92000;

   this.showImages = false;

   // Define functions
   this.readImage = function( filePath ){

      var inputImageWindow = ImageWindow.open(filePath);
      return inputImageWindow[0];
   }
   this.writeImage =
}
