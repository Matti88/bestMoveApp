const Steps = () => {
    return (
      <section className="py-10 bg-white dark:bg-gray-900 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">How does it work?</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Discover in a few minutes what are really the best options for you, no matter if you know the city or not
            </p>
          </div>
  
          <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
            </div>
  
            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700 dark:text-gray-200"> 1 </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-black dark:text-white md:mt-10">
                  Access to the Map and load a dataset of Listings
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  Visualize on the map the City you have to relocate to or you move within.
                </p>
              </div>
  
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700 dark:text-gray-200"> 2 </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-black dark:text-white md:mt-10">
                  Add all your Points of Interest
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  By adding your Points of Interest (POI), you will be able to compare the distance in terms of time and cost.
                </p>
              </div>
  
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700 dark:text-gray-200"> 3 </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-black dark:text-white md:mt-10">
                  Filter and Download
                </h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                  After applying your favorite criteria, you will be given an overview of the results that you can download.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Steps;
  