import { Outlet } from 'react-router'


const CenteredLayout = () => {
    return (
        <div className='h-full w-full flex items-center justify-center p-4'>
            <Outlet />
        </div>
    )
}

export default CenteredLayout