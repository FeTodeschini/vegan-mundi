import React from 'react';

export interface TabProps {
    label: string;
    children: React.ReactNode;
}

// This Tab component is needed only because of Typecript :( The original Tabs component had <div label="in person" />, but Typescript
// doesn't accept a "label" props for a div, so the Tab component encapsulates de div, adding the label to it 
const Tab: React.FC<TabProps> = ({ label, children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Tab;