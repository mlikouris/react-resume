const Loader = () => {
    return (
        <div className="flex items-center justify-center h-full flex-col gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white-900"></div>
            Submitting message...
        </div>
    );
}
export default Loader;