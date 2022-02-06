

export function HostAssetPreview({ asset, toggleComponent, screenWidth }) {
    return (
        <tr>
            {screenWidth > 460 && <td><img className="img-asset" src={asset.imgUrls[0]} alt="" /></td>}
            <td className="bold">{asset.name}</td>
            <td>{asset.type}</td>
            <td>{asset.loc.address}</td>
            <td><span className="fs18">${asset.price.toLocaleString('en-IL')}</span></td>
            <td className='action-edit'><button onClick={() => { toggleComponent({ isAddAsset: true, isMyAsset: false, isOrders: false, isRates: false }, asset) }}>Edit</button></td>
        </tr>

    )
}