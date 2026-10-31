import Plot from 'react-plotly.js'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Vitals = (): React.ReactElement => {
    return (
        <>
            <div className='flex flex-row justify-center items-center'>
                <Plot data={[
                            {
                                x: Array.from({ length: 7, }, (_, i) => i + 1),
                                y: [76, 90, 82, 84, 70, 69, 65],
                                type: 'lines',
                                line: {
                                    color: 'red'
                                }
                            },
                        ]}
                    layout={{ title: 'Heartrate (Past 6 Hours)', 
                                width: 700, height: 600,
                                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                                paper_bgcolor: 'rgba(0, 0, 0, 0)', }}
                    config={{ displayModeBar: false, staticPlot: true }} />
                <div className='flex flex-col gap-4 justify-center'>
                    <div className='flex flex-grid row-1 col-1 items-center justify-center'>
                        <FavoriteIcon className='transform scale-450 translate-x-6 animate-ping' style={{ color: 'red' }} />
                        <FavoriteIcon className='transform scale-600' style={{ color: 'red' }} />
                    </div>
                    <div className='text-center font-bold mt-14 ml-6'>
                        <h2 className='text-xl'>Heart Rate</h2>
                        <h3>(Past 6 Hours)</h3>
                    </div>
                </div> 

            </div>
        </>
    );
};

export default Vitals;