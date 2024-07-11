import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
    const [filterCount] = useStorage("filterCount", "0")

    return (
        <div
            style={{
                padding: 16
            }}>
            <h2>Welcome to Feed Filter</h2>
            <p>Number of filtered tweets so far {filterCount}</p>
        </div>
    )
}

export default IndexPopup