import { UserRepository } from './users/repository.js';
import { UserService } from './users/service.js';
import { UserController } from './users/controller.js';
import { QueueService } from './infrastructure/queue/queue-service.js';

/**
 * Container class for managing dependencies with lazy loading.
 * Allows registering factories and resolving instances on demand.
 */
class Container {
  #instances;
  #dependencies;
  /**
   * Creates a new container.
   * Initializes internal objects for dependencies and their instances.
   */
  constructor () {
    /**
     * Created instances of dependencies.
     * @type {{[key:string]: unknown}}
     */
    this.#instances = {};

    /**
     * Registered factories to create dependencies.
     * Each factory should be a function that receives the container and returns the instance.
     * @type {{[key:string]: (c?: Container) => unknown}}
     */
    this.#dependencies = {};
  }

  /**
   * Registers a dependency in the container.
   * @param {string} name - Unique name of the dependency.
   * @param {function(Container?): unknown} factory - Function that returns the instance of the dependency.
   */
  register (name, factory) {
    this.#dependencies[name] = factory;
  }

  /**
   * Resolves a dependency.
   * If it hasn't been created yet, the instance is built using the registered factory.
   * @param {string} name - Name of the dependency to resolve.
   * @returns {unknown} The instance of the dependency.
   * @throws {Error} If no factory is registered for the given name.
   */
  resolve (name) {
    if (!this.#instances[name]) {
      const factory = this.#dependencies[name];
      if (!factory) {
        throw new Error(`Dependency ${name} not found`);
      }
      this.#instances[name] = factory(this);
    }
    return this.#instances[name];
  }
}

/**
 * Singleton container exported to register and resolve dependencies.
 * @type {Container}
 */
export const container = new Container();

const { UserModel } = await import('./infrastructure/db/models/user.js');
const { createBulkUsersQueue } = await import('./infrastructure/queue/bull.js');
container.register('queueService', () => new QueueService(createBulkUsersQueue));
container.register('userRepository', () => new UserRepository(UserModel));
container.register('userService', (c) => new UserService(c.resolve('userRepository'), c.resolve('queueService')));
container.register('userController', (c) => new UserController(c.resolve('userService')));
