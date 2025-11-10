/**
   * @typedef {Object} CreateUserDto
   * @property {string} name Full name of the user.
   * @property {string} username
   * @property {string} password Password that should follow defined password rules.
    */

/**
   * @typedef {Object} UpdateUserDto
   * @property {string} [name] Full name of the user.
   * @property {string} [username]
   * @property {string} [password] Password that should follow defined password rules.
    */

/** @typedef {Object} User
 * @property {string} id UUID automatically generated.
 * @property {string} name Full name of the user.
 * @property {string} username
 * @property {string} password Password that should follow defined password rules.
 */

/** @typedef {Object} UserList
 * @property {User[]} elements Users retrieved from database.
 * @property {number} page Number of the page to retrieve.
 * @property {number} size Number entries to retrieve in each page.
 * @property {number} totalElements Number of entries found with the filter applied.
 * @property {number} totalPages Number of pages found with the filter and size applied.
 *
 */

export default {};
