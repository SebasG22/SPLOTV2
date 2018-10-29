export interface IConfigurationModel {
    id: string;
    name: string;
}
export interface IConfigurationChildrenParsed {
    id: string;
    fullId: string;
    name: string;
    type: 'RootFeature' | 'SolitaireFeature' | 'FeatureGroup';
    hasChildren: boolean;
    childrenLevel: number;
    mandatory?: boolean;
    min?: number;
    max?: number;
}

export interface IConstraintsParsed {
    id: string;
    fullId: string;
    parentId: string;
    type: string;
    expression: string;
}

export interface IUserDecision {
    childrenId: '';
    created_at: any;
}
