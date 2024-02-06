/**
 * Returns the SearchResult List with the corresponding items
 * @param items
 * @return {JSX.Element}
 * @constructor
 */
export default function SearchResult({items}) {


    return (<ul id="search-result">
        {items.map(item => {
            // render each item
            return <li key={item}>
                <a href={`/user/${item}`}>item</a>
            </li>
        })}
    </ul>);
}