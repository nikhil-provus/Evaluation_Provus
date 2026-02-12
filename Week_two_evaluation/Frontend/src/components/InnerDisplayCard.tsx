

function InnerDisplayCard({weatherAttribute,value,unit,value2}:{value : string | number,weatherAttribute : string,unit : string,value2 ?: number}){
    return <>
        <div className="bg-sky-100 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm text-gray-500">{weatherAttribute}</p>
            <p className="text-xl font-semibold">{value}{unit}{value2 ? "/ "+value2:null}{value2 ? unit : null}</p>
        </div>
    </>
}

export default InnerDisplayCard