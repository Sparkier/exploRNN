/**
 * A necessary helper class to set up the worker thread
 */
export default class WebWorker {
  /**
     * Adds the worker's code to the global context so that it can be accessed
     * within the application
     *
     * @param {*} worker the worker thread handling the network model
     */
  constructor(worker) {
    const code = worker.toString();
    const blob = new Blob(['(' + code + ')()']);
    return new Worker(URL.createObjectURL(blob));
  }
}
