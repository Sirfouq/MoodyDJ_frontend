import { Outlet } from 'react-router'


const CenteredLayout = () => {
    return (
        <div className='h-full w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-0 to-indigo-100 relative overflow-hidden '>
            <div className="pointer-events-none absolute top-[-10%] left-[-10%] size-[500px] rounded-full bg-indigo-300/40 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] size-[500px] rounded-full bg-purple-300/40 blur-[120px]" />
            <Outlet />
        </div>
    )
}

export default CenteredLayout