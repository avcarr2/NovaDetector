/* Linear fit engine for galaxy detection
 *
 */
# define DEFAULT_OUTPUT_EXTENSION ".xisf"

function NovaEngine(){

   // Initialization and general options
   this.outputExtension = DEFAULT_OUTPUT_EXTENSION;
   this.overwriteExisting = false;
   this.outputFormat = null;
   this.showImages = false;

   // View selection for reference and output images
   this.referenceImage = "";
   this.referenceImageWindow = null;
   this.referenceView = null;

   this.outputImage = "";
   this.outputImageWindow = null;
   this.outputView = null;

   // method specific parameters

   // Linear Fit Process parameters
   this.rejectHigh = 0.9200;
   this.rejectLow = 0.0000;

   // Utility functions
   // load reference view
   this.readImage = function(filePath){
      var inputImageWindow = ImageWindow.open(filePath);
      return inputImageWindow[0];
   }

   this.writeImage = function(imageWindow, filePath){
      // need error handling on this
      imageWindow.saveAs( outputFilePath, false, false, false, false );
   }

   this.loadReference = function(){
      this.referenceImageWindow = this.readImage(this.referenceImage);
      this.referenceView = this.referenceImageWindow.mainView;
   }

   this.loadOutput = function(){
      this.outputImageWindow = this.readImage(this.outputImage);
      this.outputView = this.output.mainView;
   }

   this.freeReference = function(){

         if ( this.referenceImageWindow != null )
         {
            this.referenceImageWindow.purge();
            this.referenceImageWindow.close();
         }
         this.referenceImageWindow  = null;
   }

   this.freeOutput = function(){
      if ( this.outputImageWindow != null ){
         this.outputImageWindow.purge();
         this.outputImageWindow.close();
      }
      this.outputImageWindow = null;
   }

   // clean-up functions
   this.tearDown = function(){
      this.freeReference();
      this.freeOutput();
   }

   // methods for performing steps
   this.performLinearFit = function(referenceView, outputView){
         var linearFit = new LinearFit;
            with(linearFit){
               referenceView = this.referenceView.id;
               rejectLow = this.rejectLow;
               rejectHigh = this.rejectHigh;
               executeOn(outputView);
         }
      }

   // performBackgroundExtraction parameters to control in GUI
   // everything else prety much needs to be constant
   // assumes that division will be unecessary since these images
   // should already be flat corrected
   this.ABE_tolerance = 1.000;
   this.ABE_deviation = 0.800;
   this.ABE_unbalance = 1.800;
   this.ABE_minBoxFraction = 0.050;
   this.ABE_polyDegree = 4;
   this.performBackgroundExtraction = function(referenceView, outputView){
      var ABE = new AutomaticBackgroundExtractor;
      with(ABE)
      {
            P.tolerance = this.ABE_tolerance;
            P.deviation = this.ABE_deviation;
            P.unbalance = this.ABE_unbalance;
            P.minBoxFraction = this.ABE_minBoxFraction;
            P.maxBackground = 1.0000;
            P.minBackground = 0.0000;
            P.useBrightnessLimits = false;
            P.polyDegree = this.ABE_polyDegree;
            P.boxSize = 5;
            P.boxSeparation = 5;
            P.modelImageSampleFormat = AutomaticBackgroundExtractor.prototype.f32;
            P.abeDownsample = 2.00;
            P.writeSampleBoxes = false;
            P.justTrySamples = false;
            P.targetCorrection = AutomaticBackgroundExtractor.prototype.Subtract;
            P.normalize = false;
            P.discardModel = true;
            P.replaceTarget = false;
            P.correctedImageId = "";
            P.correctedImageSampleFormat = AutomaticBackgroundExtractor.prototype.SameAsTarget;
            P.verboseCoefficients = false;
            P.compareModel = false;
            P.compareFactor = 10.00;
            executeOn(referenceView); executeOn(outputView);
         }
   }
   this.performStarAlignment = function(referenceView, outputView){}
   this.performImageAnnotation = function(){}
   this.performImageSubtraction = function(referenceView, outputView)
   {

         var PixelSubtraction = new PixelMath;
         PIxelSubtraction.expression = "Image1 - Image2";
         PIxelSubtraction.expression1 = "";
         PIxelSubtraction.expression2 = "";
         PIxelSubtraction.expression3 = "";
         PIxelSubtraction.useSingleExpression = true;
         PixelSubtraction.symbols = "";
         PixelSubtraction.clearImageCacheAndExit = false;
         PixelSubtraction.cacheGeneratedImages = false;
         PixelSubtraction.generateOutput = true;
         PixelSubtraction.singleThreaded = false;
         PixelSubtraction.optimization = true;
         PixelSubtraction.use64BitWorkingImage = false;
         PixelSubtraction.rescale = false;
         PixelSubtraction.rescaleLower = 0;
         PixelSubtraction.rescaleUpper = 1;
         PixelSubtraction.truncate = true;
         PixelSubtraction.truncateLower = 0;
         PixelSubtraction.truncateUpper = 1;
         PixelSubtraction.createNewImage = true;
         PixelSubtraction.showNewImage = true;
         PixelSubtraction.newImageId = "";
         PixelSubtraction.newImageWidth = 0;
         PixelSubtraction.newImageHeight = 0;
         PixelSubtraction.newImageAlpha = false;
         PixelSubtraction.newImageColorSpace = PixelMath.prototype.SameAsTarget;
         P.newImageSampleFormat = PixelMath.prototype.SameAsTarget;
         with(PixelSubtraction){}


      }
}
