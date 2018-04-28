/**
 * Capitalizes the first letter of a string.
 * @param string
 */
export default (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
