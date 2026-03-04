const H2 = ({ title, marginBorder, color }: 
    { title: string, marginBorder: string, color: string }) => {

    return (
        <>
            <h2 className={`text-4xl md:text-5xl font-bold ${color} mb-6 leading-loose landscape:leading-[1.3] portrait:leading-[1.1]`}>
                {title}
            </h2>
            <div className={`h-1 w-24 bg-accent mb-8 rounded ${marginBorder}`} />
        </>
    );
}

export default H2;