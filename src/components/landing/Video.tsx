const Video = () => {
  return (
    <section className="py-8 bg-white dark:bg-gray-900 sm:py-8 lg:py-10">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
            Just watch a video!
          </h2>
          <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            Learn how to use bestMove in just a couple of minutes. Watch the tutorial below and discover how you can use bestMove to find the best solution for you.
          </p>
        </div>

        <div className="relative mt-8 lg:mt-5">
          <div className="relative flex justify-center">
            <iframe
              className="w-full max-w-3xl aspect-video rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/a4YysSHueHs"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;
