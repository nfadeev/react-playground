import React from 'react';
import './donut-chart.css';

const radius = 15.915494309189533576888376337251;

export function DonutChart(props) {
    const data = props.data.filter(e => e.value > 0);
    const { width = 3, backgroundColor = 'white' } = props;
    const centerCoordinate = radius + width / 2;
    const viewBoxSize = (centerCoordinate) * 2;

    return (<div>
        <div className='donut-chart-wrapper'>
            <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="donut-chart">
                {getSegments()}
            </svg>
        </div>
    </div>);

    function getSegments() {
        const segments = [];
        pushBackgroundSegment(segments);
        pushDataSegments(segments);
        return segments;
    }

    function pushBackgroundSegment(segments) {
        segments.push(
            <circle key="donut-chart-separator"
                className="donut-chart-separator"
                cx={centerCoordinate}
                cy={centerCoordinate}
                r={radius}
                fill="transparent"
                stroke={backgroundColor}
                strokeWidth={width} />);
    }

    function pushDataSegments(segments) {
        const total = data.reduce((a, b) => a + b.value, 0);
        let traveled = 0;
        data.forEach((element, index) => {
            const length = (element.value / total) * 100;
            const offset = getOffset(traveled);
            traveled += length;
            segments.push(getSegment(element.color, offset, length, index));
        });
    }

    function getSegment(color, offset, length, index) {
        let separator = 0.2;
        if (length <= separator) {
            separator = separator - length;
        }
        length -= separator;
        offset -= separator / 2;
        return <circle key={`'donut-chart-segment-'${index}`}
            className="donut-chart-segment"
            cx={centerCoordinate} cy={centerCoordinate}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={width}
            strokeDasharray={`${length} ${100 - length}`}
            strokeDashoffset={`${offset}`} />;
    }

    function getOffset(traveled) {
        if (traveled < 25) {
            return 25 - traveled;
        }
        return (100 - traveled) + 25;
    }
}
