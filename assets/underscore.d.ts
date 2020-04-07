// Type definitions for ./underscore.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * The Underscore object. All exported functions below are added to it in the
 * modules/index-all.js using the mixin function.
 */
declare interface _ {
		
	/**
	 * 
	 * @param obj 
	 * @return  
	 */
	new (obj : any): any;
		
	/**
	 * Extracts the result from a wrapped and chained object.
	 * @return  
	 */
	value(): /* !this._wrapped */ any;
		
	/**
	 * 
	 */
	toJSON : /* _.prototype.value */ any;
		
	/**
	 * 
	 */
	VERSION : string;
		
	/**
	 * External wrapper for our callback generator. Users may customize
	 * `_.iteratee` if they want additional predicate/iteratee shorthand styles.
	 * This abstraction hides the internal-only argCount argument.
	 * @param value 
	 * @param context 
	 * @return  
	 */
	iteratee(value : any, context : boolean): any;
	
	/**
	 * By default, Underscore uses ERB-style template delimiters, change the
	 * following template settings to use alternative delimiters.
	 */
	templateSettings : {
				
		/**
		 * 
		 */
		evaluate : RegExp;
				
		/**
		 * 
		 */
		interpolate : RegExp;
				
		/**
		 * 
		 */
		escape : RegExp;
	}
		
	/**
	 * 
	 * @return  
	 */
	noConflict(): (obj : any) => void;
}
