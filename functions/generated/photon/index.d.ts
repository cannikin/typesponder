import { DMMF, DMMFClass, Engine } from './runtime';
/**
 * Utility Types
 */
export declare type Enumerable<T> = T | Array<T>;
export declare type MergeTruthyValues<R extends object, S extends object> = {
    [key in keyof S | keyof R]: key extends false ? never : key extends keyof S ? S[key] extends false ? never : S[key] : key extends keyof R ? R[key] : never;
};
export declare type CleanupNever<T> = {
    [key in keyof T]: T[key] extends never ? never : key;
}[keyof T];
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PhotonFetcher {
    private readonly photon;
    private readonly engine;
    private readonly debug;
    private readonly hooks?;
    constructor(photon: Photon, engine: Engine, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, path?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    protected unpack(data: any, path: string[], rootField?: string, isList?: boolean): any;
}
/**
 * Client
**/
export declare type Datasources = {
    db?: string;
};
export interface PhotonOptions {
    datasources?: Datasources;
    debug?: boolean | {
        engine?: boolean;
        library?: boolean;
    };
    /**
     * You probably don't want to use this. `__internal` is used by internal tooling.
     */
    __internal?: {
        hooks?: Hooks;
        engine?: {
            cwd?: string;
            binaryPath?: string;
        };
    };
}
export declare type Hooks = {
    beforeRequest?: (options: {
        query: string;
        path: string[];
        rootField?: string;
        typeName?: string;
        document: any;
    }) => any;
};
export default class Photon {
    private fetcher;
    private readonly dmmf;
    private readonly engine;
    private readonly datamodel;
    private connectionPromise?;
    constructor(options?: PhotonOptions);
    private connectEngine;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    readonly forms: FormDelegate;
    readonly questions: QuestionDelegate;
    readonly answers: AnswerDelegate;
    readonly responses: ResponseDelegate;
    readonly users: UserDelegate;
    readonly notes: NoteDelegate;
}
export declare const OrderByArg: {
    asc: "asc";
    desc: "desc";
};
export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg];
/**
 * Model Form
 */
export declare type Form = {
    id: number;
    uid: string;
    name: string;
    tag: string;
};
export declare type FormScalars = 'id' | 'uid' | 'name' | 'tag';
export declare type FormSelect = {
    id?: boolean;
    uid?: boolean;
    name?: boolean;
    tag?: boolean;
    questions?: boolean | FindManyQuestionSelectArgsOptional;
    responses?: boolean | FindManyResponseSelectArgsOptional;
};
export declare type FormInclude = {
    questions?: boolean | FindManyQuestionIncludeArgsOptional;
    responses?: boolean | FindManyResponseIncludeArgsOptional;
};
declare type FormDefault = {
    id: true;
    uid: true;
    name: true;
    tag: true;
};
declare type FormGetSelectPayload<S extends boolean | FormSelect> = S extends true ? Form : S extends FormSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends FormScalars ? Form[P] : P extends 'questions' ? Array<QuestionGetSelectPayload<ExtractFindManyQuestionSelectArgs<S[P]>>> : P extends 'responses' ? Array<ResponseGetSelectPayload<ExtractFindManyResponseSelectArgs<S[P]>>> : never;
} : never;
declare type FormGetIncludePayload<S extends boolean | FormInclude> = S extends true ? Form : S extends FormInclude ? {
    [P in CleanupNever<MergeTruthyValues<FormDefault, S>>]: P extends FormScalars ? Form[P] : P extends 'questions' ? Array<QuestionGetIncludePayload<ExtractFindManyQuestionIncludeArgs<S[P]>>> : P extends 'responses' ? Array<ResponseGetIncludePayload<ExtractFindManyResponseIncludeArgs<S[P]>>> : never;
} : never;
export interface FormDelegate {
    <T extends FindManyFormArgs>(args?: Subset<T, FindManyFormArgs>): T extends FindManyFormArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyFormSelectArgs ? Promise<Array<FormGetSelectPayload<ExtractFindManyFormSelectArgs<T>>>> : T extends FindManyFormIncludeArgs ? Promise<Array<FormGetIncludePayload<ExtractFindManyFormIncludeArgs<T>>>> : Promise<Array<Form>>;
    findOne<T extends FindOneFormArgs>(args: Subset<T, FindOneFormArgs>): T extends FindOneFormArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneFormSelectArgs ? Promise<FormGetSelectPayload<ExtractFindOneFormSelectArgs<T>>> : T extends FindOneFormIncludeArgs ? Promise<FormGetIncludePayload<ExtractFindOneFormIncludeArgs<T>>> : FormClient<Form>;
    findMany<T extends FindManyFormArgs>(args?: Subset<T, FindManyFormArgs>): T extends FindManyFormArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyFormSelectArgs ? Promise<Array<FormGetSelectPayload<ExtractFindManyFormSelectArgs<T>>>> : T extends FindManyFormIncludeArgs ? Promise<Array<FormGetIncludePayload<ExtractFindManyFormIncludeArgs<T>>>> : Promise<Array<Form>>;
    create<T extends FormCreateArgs>(args: Subset<T, FormCreateArgs>): T extends FormCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends FormSelectCreateArgs ? Promise<FormGetSelectPayload<ExtractFormSelectCreateArgs<T>>> : T extends FormIncludeCreateArgs ? Promise<FormGetIncludePayload<ExtractFormIncludeCreateArgs<T>>> : FormClient<Form>;
    delete<T extends FormDeleteArgs>(args: Subset<T, FormDeleteArgs>): T extends FormDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends FormSelectDeleteArgs ? Promise<FormGetSelectPayload<ExtractFormSelectDeleteArgs<T>>> : T extends FormIncludeDeleteArgs ? Promise<FormGetIncludePayload<ExtractFormIncludeDeleteArgs<T>>> : FormClient<Form>;
    update<T extends FormUpdateArgs>(args: Subset<T, FormUpdateArgs>): T extends FormUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends FormSelectUpdateArgs ? Promise<FormGetSelectPayload<ExtractFormSelectUpdateArgs<T>>> : T extends FormIncludeUpdateArgs ? Promise<FormGetIncludePayload<ExtractFormIncludeUpdateArgs<T>>> : FormClient<Form>;
    deleteMany<T extends FormDeleteManyArgs>(args: Subset<T, FormDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends FormUpdateManyArgs>(args: Subset<T, FormUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends FormUpsertArgs>(args: Subset<T, FormUpsertArgs>): T extends FormUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends FormSelectUpsertArgs ? Promise<FormGetSelectPayload<ExtractFormSelectUpsertArgs<T>>> : T extends FormIncludeUpsertArgs ? Promise<FormGetIncludePayload<ExtractFormIncludeUpsertArgs<T>>> : FormClient<Form>;
}
export declare class FormClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    questions<T extends FindManyQuestionArgs = {}>(args?: Subset<T, FindManyQuestionArgs>): T extends FindManyQuestionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyQuestionSelectArgs ? Promise<Array<QuestionGetSelectPayload<ExtractFindManyQuestionSelectArgs<T>>>> : T extends FindManyQuestionIncludeArgs ? Promise<Array<QuestionGetIncludePayload<ExtractFindManyQuestionIncludeArgs<T>>>> : Promise<Array<Question>>;
    responses<T extends FindManyResponseArgs = {}>(args?: Subset<T, FindManyResponseArgs>): T extends FindManyResponseArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyResponseSelectArgs ? Promise<Array<ResponseGetSelectPayload<ExtractFindManyResponseSelectArgs<T>>>> : T extends FindManyResponseIncludeArgs ? Promise<Array<ResponseGetIncludePayload<ExtractFindManyResponseIncludeArgs<T>>>> : Promise<Array<Response>>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Form findOne
 */
export declare type FindOneFormArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
    where: FormWhereUniqueInput;
};
export declare type FindOneFormArgsRequired = {
    select: FormSelect;
    include: FormInclude;
    where: FormWhereUniqueInput;
};
export declare type FindOneFormSelectArgs = {
    select: FormSelect;
    where: FormWhereUniqueInput;
};
export declare type FindOneFormSelectArgsOptional = {
    select?: FormSelect | null;
    where: FormWhereUniqueInput;
};
export declare type FindOneFormIncludeArgs = {
    include: FormInclude;
    where: FormWhereUniqueInput;
};
export declare type FindOneFormIncludeArgsOptional = {
    include?: FormInclude | null;
    where: FormWhereUniqueInput;
};
export declare type ExtractFindOneFormSelectArgs<S extends undefined | boolean | FindOneFormSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneFormSelectArgs ? S['select'] : true;
export declare type ExtractFindOneFormIncludeArgs<S extends undefined | boolean | FindOneFormIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneFormIncludeArgs ? S['include'] : true;
/**
 * Form findMany
 */
export declare type FindManyFormArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
    where?: FormWhereInput | null;
    orderBy?: FormOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFormArgsRequired = {
    select: FormSelect;
    include: FormInclude;
    where?: FormWhereInput | null;
    orderBy?: FormOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFormSelectArgs = {
    select: FormSelect;
    where?: FormWhereInput | null;
    orderBy?: FormOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFormSelectArgsOptional = {
    select?: FormSelect | null;
    where?: FormWhereInput | null;
    orderBy?: FormOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFormIncludeArgs = {
    include: FormInclude;
    where?: FormWhereInput | null;
    orderBy?: FormOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyFormIncludeArgsOptional = {
    include?: FormInclude | null;
    where?: FormWhereInput | null;
    orderBy?: FormOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyFormSelectArgs<S extends undefined | boolean | FindManyFormSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyFormSelectArgs ? S['select'] : true;
export declare type ExtractFindManyFormIncludeArgs<S extends undefined | boolean | FindManyFormIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyFormIncludeArgs ? S['include'] : true;
/**
 * Form create
 */
export declare type FormCreateArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
    data: FormCreateInput;
};
export declare type FormCreateArgsRequired = {
    select: FormSelect;
    include: FormInclude;
    data: FormCreateInput;
};
export declare type FormSelectCreateArgs = {
    select: FormSelect;
    data: FormCreateInput;
};
export declare type FormSelectCreateArgsOptional = {
    select?: FormSelect | null;
    data: FormCreateInput;
};
export declare type FormIncludeCreateArgs = {
    include: FormInclude;
    data: FormCreateInput;
};
export declare type FormIncludeCreateArgsOptional = {
    include?: FormInclude | null;
    data: FormCreateInput;
};
export declare type ExtractFormSelectCreateArgs<S extends undefined | boolean | FormSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormSelectCreateArgs ? S['select'] : true;
export declare type ExtractFormIncludeCreateArgs<S extends undefined | boolean | FormIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormIncludeCreateArgs ? S['include'] : true;
/**
 * Form update
 */
export declare type FormUpdateArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
    data: FormUpdateInput;
    where: FormWhereUniqueInput;
};
export declare type FormUpdateArgsRequired = {
    select: FormSelect;
    include: FormInclude;
    data: FormUpdateInput;
    where: FormWhereUniqueInput;
};
export declare type FormSelectUpdateArgs = {
    select: FormSelect;
    data: FormUpdateInput;
    where: FormWhereUniqueInput;
};
export declare type FormSelectUpdateArgsOptional = {
    select?: FormSelect | null;
    data: FormUpdateInput;
    where: FormWhereUniqueInput;
};
export declare type FormIncludeUpdateArgs = {
    include: FormInclude;
    data: FormUpdateInput;
    where: FormWhereUniqueInput;
};
export declare type FormIncludeUpdateArgsOptional = {
    include?: FormInclude | null;
    data: FormUpdateInput;
    where: FormWhereUniqueInput;
};
export declare type ExtractFormSelectUpdateArgs<S extends undefined | boolean | FormSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormSelectUpdateArgs ? S['select'] : true;
export declare type ExtractFormIncludeUpdateArgs<S extends undefined | boolean | FormIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormIncludeUpdateArgs ? S['include'] : true;
/**
 * Form updateMany
 */
export declare type FormUpdateManyArgs = {
    data: FormUpdateManyMutationInput;
    where?: FormWhereInput | null;
};
/**
 * Form upsert
 */
export declare type FormUpsertArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
    where: FormWhereUniqueInput;
    create: FormCreateInput;
    update: FormUpdateInput;
};
export declare type FormUpsertArgsRequired = {
    select: FormSelect;
    include: FormInclude;
    where: FormWhereUniqueInput;
    create: FormCreateInput;
    update: FormUpdateInput;
};
export declare type FormSelectUpsertArgs = {
    select: FormSelect;
    where: FormWhereUniqueInput;
    create: FormCreateInput;
    update: FormUpdateInput;
};
export declare type FormSelectUpsertArgsOptional = {
    select?: FormSelect | null;
    where: FormWhereUniqueInput;
    create: FormCreateInput;
    update: FormUpdateInput;
};
export declare type FormIncludeUpsertArgs = {
    include: FormInclude;
    where: FormWhereUniqueInput;
    create: FormCreateInput;
    update: FormUpdateInput;
};
export declare type FormIncludeUpsertArgsOptional = {
    include?: FormInclude | null;
    where: FormWhereUniqueInput;
    create: FormCreateInput;
    update: FormUpdateInput;
};
export declare type ExtractFormSelectUpsertArgs<S extends undefined | boolean | FormSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormSelectUpsertArgs ? S['select'] : true;
export declare type ExtractFormIncludeUpsertArgs<S extends undefined | boolean | FormIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormIncludeUpsertArgs ? S['include'] : true;
/**
 * Form delete
 */
export declare type FormDeleteArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
    where: FormWhereUniqueInput;
};
export declare type FormDeleteArgsRequired = {
    select: FormSelect;
    include: FormInclude;
    where: FormWhereUniqueInput;
};
export declare type FormSelectDeleteArgs = {
    select: FormSelect;
    where: FormWhereUniqueInput;
};
export declare type FormSelectDeleteArgsOptional = {
    select?: FormSelect | null;
    where: FormWhereUniqueInput;
};
export declare type FormIncludeDeleteArgs = {
    include: FormInclude;
    where: FormWhereUniqueInput;
};
export declare type FormIncludeDeleteArgsOptional = {
    include?: FormInclude | null;
    where: FormWhereUniqueInput;
};
export declare type ExtractFormSelectDeleteArgs<S extends undefined | boolean | FormSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormSelectDeleteArgs ? S['select'] : true;
export declare type ExtractFormIncludeDeleteArgs<S extends undefined | boolean | FormIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormIncludeDeleteArgs ? S['include'] : true;
/**
 * Form deleteMany
 */
export declare type FormDeleteManyArgs = {
    where?: FormWhereInput | null;
};
/**
 * Form without action
 */
export declare type FormArgs = {
    select?: FormSelect | null;
    include?: FormInclude | null;
};
export declare type FormArgsRequired = {
    select: FormSelect;
    include: FormInclude;
};
export declare type FormSelectArgs = {
    select: FormSelect;
};
export declare type FormSelectArgsOptional = {
    select?: FormSelect | null;
};
export declare type FormIncludeArgs = {
    include: FormInclude;
};
export declare type FormIncludeArgsOptional = {
    include?: FormInclude | null;
};
export declare type ExtractFormSelectArgs<S extends undefined | boolean | FormSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormSelectArgs ? S['select'] : true;
export declare type ExtractFormIncludeArgs<S extends undefined | boolean | FormIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FormIncludeArgs ? S['include'] : true;
/**
 * Model Question
 */
export declare type Question = {
    id: number;
    uid: string;
    type: string;
    text: string;
    createdAt: string;
    updatedAt: string;
};
export declare type QuestionScalars = 'id' | 'uid' | 'type' | 'text' | 'createdAt' | 'updatedAt';
export declare type QuestionSelect = {
    id?: boolean;
    uid?: boolean;
    type?: boolean;
    text?: boolean;
    form?: boolean | FormSelectArgsOptional;
    answers?: boolean | FindManyAnswerSelectArgsOptional;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export declare type QuestionInclude = {
    form?: boolean | FormIncludeArgsOptional;
    answers?: boolean | FindManyAnswerIncludeArgsOptional;
};
declare type QuestionDefault = {
    id: true;
    uid: true;
    type: true;
    text: true;
    createdAt: true;
    updatedAt: true;
};
declare type QuestionGetSelectPayload<S extends boolean | QuestionSelect> = S extends true ? Question : S extends QuestionSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends QuestionScalars ? Question[P] : P extends 'form' ? FormGetSelectPayload<ExtractFormSelectArgs<S[P]>> : P extends 'answers' ? Array<AnswerGetSelectPayload<ExtractFindManyAnswerSelectArgs<S[P]>>> : never;
} : never;
declare type QuestionGetIncludePayload<S extends boolean | QuestionInclude> = S extends true ? Question : S extends QuestionInclude ? {
    [P in CleanupNever<MergeTruthyValues<QuestionDefault, S>>]: P extends QuestionScalars ? Question[P] : P extends 'form' ? FormGetIncludePayload<ExtractFormIncludeArgs<S[P]>> : P extends 'answers' ? Array<AnswerGetIncludePayload<ExtractFindManyAnswerIncludeArgs<S[P]>>> : never;
} : never;
export interface QuestionDelegate {
    <T extends FindManyQuestionArgs>(args?: Subset<T, FindManyQuestionArgs>): T extends FindManyQuestionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyQuestionSelectArgs ? Promise<Array<QuestionGetSelectPayload<ExtractFindManyQuestionSelectArgs<T>>>> : T extends FindManyQuestionIncludeArgs ? Promise<Array<QuestionGetIncludePayload<ExtractFindManyQuestionIncludeArgs<T>>>> : Promise<Array<Question>>;
    findOne<T extends FindOneQuestionArgs>(args: Subset<T, FindOneQuestionArgs>): T extends FindOneQuestionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneQuestionSelectArgs ? Promise<QuestionGetSelectPayload<ExtractFindOneQuestionSelectArgs<T>>> : T extends FindOneQuestionIncludeArgs ? Promise<QuestionGetIncludePayload<ExtractFindOneQuestionIncludeArgs<T>>> : QuestionClient<Question>;
    findMany<T extends FindManyQuestionArgs>(args?: Subset<T, FindManyQuestionArgs>): T extends FindManyQuestionArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyQuestionSelectArgs ? Promise<Array<QuestionGetSelectPayload<ExtractFindManyQuestionSelectArgs<T>>>> : T extends FindManyQuestionIncludeArgs ? Promise<Array<QuestionGetIncludePayload<ExtractFindManyQuestionIncludeArgs<T>>>> : Promise<Array<Question>>;
    create<T extends QuestionCreateArgs>(args: Subset<T, QuestionCreateArgs>): T extends QuestionCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends QuestionSelectCreateArgs ? Promise<QuestionGetSelectPayload<ExtractQuestionSelectCreateArgs<T>>> : T extends QuestionIncludeCreateArgs ? Promise<QuestionGetIncludePayload<ExtractQuestionIncludeCreateArgs<T>>> : QuestionClient<Question>;
    delete<T extends QuestionDeleteArgs>(args: Subset<T, QuestionDeleteArgs>): T extends QuestionDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends QuestionSelectDeleteArgs ? Promise<QuestionGetSelectPayload<ExtractQuestionSelectDeleteArgs<T>>> : T extends QuestionIncludeDeleteArgs ? Promise<QuestionGetIncludePayload<ExtractQuestionIncludeDeleteArgs<T>>> : QuestionClient<Question>;
    update<T extends QuestionUpdateArgs>(args: Subset<T, QuestionUpdateArgs>): T extends QuestionUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends QuestionSelectUpdateArgs ? Promise<QuestionGetSelectPayload<ExtractQuestionSelectUpdateArgs<T>>> : T extends QuestionIncludeUpdateArgs ? Promise<QuestionGetIncludePayload<ExtractQuestionIncludeUpdateArgs<T>>> : QuestionClient<Question>;
    deleteMany<T extends QuestionDeleteManyArgs>(args: Subset<T, QuestionDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends QuestionUpdateManyArgs>(args: Subset<T, QuestionUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends QuestionUpsertArgs>(args: Subset<T, QuestionUpsertArgs>): T extends QuestionUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends QuestionSelectUpsertArgs ? Promise<QuestionGetSelectPayload<ExtractQuestionSelectUpsertArgs<T>>> : T extends QuestionIncludeUpsertArgs ? Promise<QuestionGetIncludePayload<ExtractQuestionIncludeUpsertArgs<T>>> : QuestionClient<Question>;
}
export declare class QuestionClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    form<T extends FormArgs = {}>(args?: Subset<T, FormArgs>): T extends FindOneFormArgsRequired ? 'Please either choose `select` or `include`' : T extends FormSelectArgs ? Promise<FormGetSelectPayload<ExtractFormSelectArgs<T>>> : T extends FormIncludeArgs ? Promise<FormGetIncludePayload<ExtractFormIncludeArgs<T>>> : FormClient<Form>;
    answers<T extends FindManyAnswerArgs = {}>(args?: Subset<T, FindManyAnswerArgs>): T extends FindManyAnswerArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyAnswerSelectArgs ? Promise<Array<AnswerGetSelectPayload<ExtractFindManyAnswerSelectArgs<T>>>> : T extends FindManyAnswerIncludeArgs ? Promise<Array<AnswerGetIncludePayload<ExtractFindManyAnswerIncludeArgs<T>>>> : Promise<Array<Answer>>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Question findOne
 */
export declare type FindOneQuestionArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
    where: QuestionWhereUniqueInput;
};
export declare type FindOneQuestionArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
    where: QuestionWhereUniqueInput;
};
export declare type FindOneQuestionSelectArgs = {
    select: QuestionSelect;
    where: QuestionWhereUniqueInput;
};
export declare type FindOneQuestionSelectArgsOptional = {
    select?: QuestionSelect | null;
    where: QuestionWhereUniqueInput;
};
export declare type FindOneQuestionIncludeArgs = {
    include: QuestionInclude;
    where: QuestionWhereUniqueInput;
};
export declare type FindOneQuestionIncludeArgsOptional = {
    include?: QuestionInclude | null;
    where: QuestionWhereUniqueInput;
};
export declare type ExtractFindOneQuestionSelectArgs<S extends undefined | boolean | FindOneQuestionSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneQuestionSelectArgs ? S['select'] : true;
export declare type ExtractFindOneQuestionIncludeArgs<S extends undefined | boolean | FindOneQuestionIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneQuestionIncludeArgs ? S['include'] : true;
/**
 * Question findMany
 */
export declare type FindManyQuestionArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
    where?: QuestionWhereInput | null;
    orderBy?: QuestionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyQuestionArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
    where?: QuestionWhereInput | null;
    orderBy?: QuestionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyQuestionSelectArgs = {
    select: QuestionSelect;
    where?: QuestionWhereInput | null;
    orderBy?: QuestionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyQuestionSelectArgsOptional = {
    select?: QuestionSelect | null;
    where?: QuestionWhereInput | null;
    orderBy?: QuestionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyQuestionIncludeArgs = {
    include: QuestionInclude;
    where?: QuestionWhereInput | null;
    orderBy?: QuestionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyQuestionIncludeArgsOptional = {
    include?: QuestionInclude | null;
    where?: QuestionWhereInput | null;
    orderBy?: QuestionOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyQuestionSelectArgs<S extends undefined | boolean | FindManyQuestionSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyQuestionSelectArgs ? S['select'] : true;
export declare type ExtractFindManyQuestionIncludeArgs<S extends undefined | boolean | FindManyQuestionIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyQuestionIncludeArgs ? S['include'] : true;
/**
 * Question create
 */
export declare type QuestionCreateArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
    data: QuestionCreateInput;
};
export declare type QuestionCreateArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
    data: QuestionCreateInput;
};
export declare type QuestionSelectCreateArgs = {
    select: QuestionSelect;
    data: QuestionCreateInput;
};
export declare type QuestionSelectCreateArgsOptional = {
    select?: QuestionSelect | null;
    data: QuestionCreateInput;
};
export declare type QuestionIncludeCreateArgs = {
    include: QuestionInclude;
    data: QuestionCreateInput;
};
export declare type QuestionIncludeCreateArgsOptional = {
    include?: QuestionInclude | null;
    data: QuestionCreateInput;
};
export declare type ExtractQuestionSelectCreateArgs<S extends undefined | boolean | QuestionSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionSelectCreateArgs ? S['select'] : true;
export declare type ExtractQuestionIncludeCreateArgs<S extends undefined | boolean | QuestionIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionIncludeCreateArgs ? S['include'] : true;
/**
 * Question update
 */
export declare type QuestionUpdateArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
    data: QuestionUpdateInput;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionUpdateArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
    data: QuestionUpdateInput;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionSelectUpdateArgs = {
    select: QuestionSelect;
    data: QuestionUpdateInput;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionSelectUpdateArgsOptional = {
    select?: QuestionSelect | null;
    data: QuestionUpdateInput;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionIncludeUpdateArgs = {
    include: QuestionInclude;
    data: QuestionUpdateInput;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionIncludeUpdateArgsOptional = {
    include?: QuestionInclude | null;
    data: QuestionUpdateInput;
    where: QuestionWhereUniqueInput;
};
export declare type ExtractQuestionSelectUpdateArgs<S extends undefined | boolean | QuestionSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionSelectUpdateArgs ? S['select'] : true;
export declare type ExtractQuestionIncludeUpdateArgs<S extends undefined | boolean | QuestionIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionIncludeUpdateArgs ? S['include'] : true;
/**
 * Question updateMany
 */
export declare type QuestionUpdateManyArgs = {
    data: QuestionUpdateManyMutationInput;
    where?: QuestionWhereInput | null;
};
/**
 * Question upsert
 */
export declare type QuestionUpsertArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
    where: QuestionWhereUniqueInput;
    create: QuestionCreateInput;
    update: QuestionUpdateInput;
};
export declare type QuestionUpsertArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
    where: QuestionWhereUniqueInput;
    create: QuestionCreateInput;
    update: QuestionUpdateInput;
};
export declare type QuestionSelectUpsertArgs = {
    select: QuestionSelect;
    where: QuestionWhereUniqueInput;
    create: QuestionCreateInput;
    update: QuestionUpdateInput;
};
export declare type QuestionSelectUpsertArgsOptional = {
    select?: QuestionSelect | null;
    where: QuestionWhereUniqueInput;
    create: QuestionCreateInput;
    update: QuestionUpdateInput;
};
export declare type QuestionIncludeUpsertArgs = {
    include: QuestionInclude;
    where: QuestionWhereUniqueInput;
    create: QuestionCreateInput;
    update: QuestionUpdateInput;
};
export declare type QuestionIncludeUpsertArgsOptional = {
    include?: QuestionInclude | null;
    where: QuestionWhereUniqueInput;
    create: QuestionCreateInput;
    update: QuestionUpdateInput;
};
export declare type ExtractQuestionSelectUpsertArgs<S extends undefined | boolean | QuestionSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionSelectUpsertArgs ? S['select'] : true;
export declare type ExtractQuestionIncludeUpsertArgs<S extends undefined | boolean | QuestionIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionIncludeUpsertArgs ? S['include'] : true;
/**
 * Question delete
 */
export declare type QuestionDeleteArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionDeleteArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionSelectDeleteArgs = {
    select: QuestionSelect;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionSelectDeleteArgsOptional = {
    select?: QuestionSelect | null;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionIncludeDeleteArgs = {
    include: QuestionInclude;
    where: QuestionWhereUniqueInput;
};
export declare type QuestionIncludeDeleteArgsOptional = {
    include?: QuestionInclude | null;
    where: QuestionWhereUniqueInput;
};
export declare type ExtractQuestionSelectDeleteArgs<S extends undefined | boolean | QuestionSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionSelectDeleteArgs ? S['select'] : true;
export declare type ExtractQuestionIncludeDeleteArgs<S extends undefined | boolean | QuestionIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionIncludeDeleteArgs ? S['include'] : true;
/**
 * Question deleteMany
 */
export declare type QuestionDeleteManyArgs = {
    where?: QuestionWhereInput | null;
};
/**
 * Question without action
 */
export declare type QuestionArgs = {
    select?: QuestionSelect | null;
    include?: QuestionInclude | null;
};
export declare type QuestionArgsRequired = {
    select: QuestionSelect;
    include: QuestionInclude;
};
export declare type QuestionSelectArgs = {
    select: QuestionSelect;
};
export declare type QuestionSelectArgsOptional = {
    select?: QuestionSelect | null;
};
export declare type QuestionIncludeArgs = {
    include: QuestionInclude;
};
export declare type QuestionIncludeArgsOptional = {
    include?: QuestionInclude | null;
};
export declare type ExtractQuestionSelectArgs<S extends undefined | boolean | QuestionSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionSelectArgs ? S['select'] : true;
export declare type ExtractQuestionIncludeArgs<S extends undefined | boolean | QuestionIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends QuestionIncludeArgs ? S['include'] : true;
/**
 * Model Answer
 */
export declare type Answer = {
    id: number;
    text: string;
    createdAt: string;
    updatedAt: string;
};
export declare type AnswerScalars = 'id' | 'text' | 'createdAt' | 'updatedAt';
export declare type AnswerSelect = {
    id?: boolean;
    text?: boolean;
    question?: boolean | QuestionSelectArgsOptional;
    response?: boolean | ResponseSelectArgsOptional;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export declare type AnswerInclude = {
    question?: boolean | QuestionIncludeArgsOptional;
    response?: boolean | ResponseIncludeArgsOptional;
};
declare type AnswerDefault = {
    id: true;
    text: true;
    createdAt: true;
    updatedAt: true;
};
declare type AnswerGetSelectPayload<S extends boolean | AnswerSelect> = S extends true ? Answer : S extends AnswerSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends AnswerScalars ? Answer[P] : P extends 'question' ? QuestionGetSelectPayload<ExtractQuestionSelectArgs<S[P]>> : P extends 'response' ? ResponseGetSelectPayload<ExtractResponseSelectArgs<S[P]>> : never;
} : never;
declare type AnswerGetIncludePayload<S extends boolean | AnswerInclude> = S extends true ? Answer : S extends AnswerInclude ? {
    [P in CleanupNever<MergeTruthyValues<AnswerDefault, S>>]: P extends AnswerScalars ? Answer[P] : P extends 'question' ? QuestionGetIncludePayload<ExtractQuestionIncludeArgs<S[P]>> : P extends 'response' ? ResponseGetIncludePayload<ExtractResponseIncludeArgs<S[P]>> : never;
} : never;
export interface AnswerDelegate {
    <T extends FindManyAnswerArgs>(args?: Subset<T, FindManyAnswerArgs>): T extends FindManyAnswerArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyAnswerSelectArgs ? Promise<Array<AnswerGetSelectPayload<ExtractFindManyAnswerSelectArgs<T>>>> : T extends FindManyAnswerIncludeArgs ? Promise<Array<AnswerGetIncludePayload<ExtractFindManyAnswerIncludeArgs<T>>>> : Promise<Array<Answer>>;
    findOne<T extends FindOneAnswerArgs>(args: Subset<T, FindOneAnswerArgs>): T extends FindOneAnswerArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneAnswerSelectArgs ? Promise<AnswerGetSelectPayload<ExtractFindOneAnswerSelectArgs<T>>> : T extends FindOneAnswerIncludeArgs ? Promise<AnswerGetIncludePayload<ExtractFindOneAnswerIncludeArgs<T>>> : AnswerClient<Answer>;
    findMany<T extends FindManyAnswerArgs>(args?: Subset<T, FindManyAnswerArgs>): T extends FindManyAnswerArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyAnswerSelectArgs ? Promise<Array<AnswerGetSelectPayload<ExtractFindManyAnswerSelectArgs<T>>>> : T extends FindManyAnswerIncludeArgs ? Promise<Array<AnswerGetIncludePayload<ExtractFindManyAnswerIncludeArgs<T>>>> : Promise<Array<Answer>>;
    create<T extends AnswerCreateArgs>(args: Subset<T, AnswerCreateArgs>): T extends AnswerCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends AnswerSelectCreateArgs ? Promise<AnswerGetSelectPayload<ExtractAnswerSelectCreateArgs<T>>> : T extends AnswerIncludeCreateArgs ? Promise<AnswerGetIncludePayload<ExtractAnswerIncludeCreateArgs<T>>> : AnswerClient<Answer>;
    delete<T extends AnswerDeleteArgs>(args: Subset<T, AnswerDeleteArgs>): T extends AnswerDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends AnswerSelectDeleteArgs ? Promise<AnswerGetSelectPayload<ExtractAnswerSelectDeleteArgs<T>>> : T extends AnswerIncludeDeleteArgs ? Promise<AnswerGetIncludePayload<ExtractAnswerIncludeDeleteArgs<T>>> : AnswerClient<Answer>;
    update<T extends AnswerUpdateArgs>(args: Subset<T, AnswerUpdateArgs>): T extends AnswerUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends AnswerSelectUpdateArgs ? Promise<AnswerGetSelectPayload<ExtractAnswerSelectUpdateArgs<T>>> : T extends AnswerIncludeUpdateArgs ? Promise<AnswerGetIncludePayload<ExtractAnswerIncludeUpdateArgs<T>>> : AnswerClient<Answer>;
    deleteMany<T extends AnswerDeleteManyArgs>(args: Subset<T, AnswerDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends AnswerUpdateManyArgs>(args: Subset<T, AnswerUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends AnswerUpsertArgs>(args: Subset<T, AnswerUpsertArgs>): T extends AnswerUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends AnswerSelectUpsertArgs ? Promise<AnswerGetSelectPayload<ExtractAnswerSelectUpsertArgs<T>>> : T extends AnswerIncludeUpsertArgs ? Promise<AnswerGetIncludePayload<ExtractAnswerIncludeUpsertArgs<T>>> : AnswerClient<Answer>;
}
export declare class AnswerClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    question<T extends QuestionArgs = {}>(args?: Subset<T, QuestionArgs>): T extends FindOneQuestionArgsRequired ? 'Please either choose `select` or `include`' : T extends QuestionSelectArgs ? Promise<QuestionGetSelectPayload<ExtractQuestionSelectArgs<T>>> : T extends QuestionIncludeArgs ? Promise<QuestionGetIncludePayload<ExtractQuestionIncludeArgs<T>>> : QuestionClient<Question>;
    response<T extends ResponseArgs = {}>(args?: Subset<T, ResponseArgs>): T extends FindOneResponseArgsRequired ? 'Please either choose `select` or `include`' : T extends ResponseSelectArgs ? Promise<ResponseGetSelectPayload<ExtractResponseSelectArgs<T>>> : T extends ResponseIncludeArgs ? Promise<ResponseGetIncludePayload<ExtractResponseIncludeArgs<T>>> : ResponseClient<Response>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Answer findOne
 */
export declare type FindOneAnswerArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
    where: AnswerWhereUniqueInput;
};
export declare type FindOneAnswerArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
    where: AnswerWhereUniqueInput;
};
export declare type FindOneAnswerSelectArgs = {
    select: AnswerSelect;
    where: AnswerWhereUniqueInput;
};
export declare type FindOneAnswerSelectArgsOptional = {
    select?: AnswerSelect | null;
    where: AnswerWhereUniqueInput;
};
export declare type FindOneAnswerIncludeArgs = {
    include: AnswerInclude;
    where: AnswerWhereUniqueInput;
};
export declare type FindOneAnswerIncludeArgsOptional = {
    include?: AnswerInclude | null;
    where: AnswerWhereUniqueInput;
};
export declare type ExtractFindOneAnswerSelectArgs<S extends undefined | boolean | FindOneAnswerSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneAnswerSelectArgs ? S['select'] : true;
export declare type ExtractFindOneAnswerIncludeArgs<S extends undefined | boolean | FindOneAnswerIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneAnswerIncludeArgs ? S['include'] : true;
/**
 * Answer findMany
 */
export declare type FindManyAnswerArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
    where?: AnswerWhereInput | null;
    orderBy?: AnswerOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyAnswerArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
    where?: AnswerWhereInput | null;
    orderBy?: AnswerOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyAnswerSelectArgs = {
    select: AnswerSelect;
    where?: AnswerWhereInput | null;
    orderBy?: AnswerOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyAnswerSelectArgsOptional = {
    select?: AnswerSelect | null;
    where?: AnswerWhereInput | null;
    orderBy?: AnswerOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyAnswerIncludeArgs = {
    include: AnswerInclude;
    where?: AnswerWhereInput | null;
    orderBy?: AnswerOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyAnswerIncludeArgsOptional = {
    include?: AnswerInclude | null;
    where?: AnswerWhereInput | null;
    orderBy?: AnswerOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyAnswerSelectArgs<S extends undefined | boolean | FindManyAnswerSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyAnswerSelectArgs ? S['select'] : true;
export declare type ExtractFindManyAnswerIncludeArgs<S extends undefined | boolean | FindManyAnswerIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyAnswerIncludeArgs ? S['include'] : true;
/**
 * Answer create
 */
export declare type AnswerCreateArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
    data: AnswerCreateInput;
};
export declare type AnswerCreateArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
    data: AnswerCreateInput;
};
export declare type AnswerSelectCreateArgs = {
    select: AnswerSelect;
    data: AnswerCreateInput;
};
export declare type AnswerSelectCreateArgsOptional = {
    select?: AnswerSelect | null;
    data: AnswerCreateInput;
};
export declare type AnswerIncludeCreateArgs = {
    include: AnswerInclude;
    data: AnswerCreateInput;
};
export declare type AnswerIncludeCreateArgsOptional = {
    include?: AnswerInclude | null;
    data: AnswerCreateInput;
};
export declare type ExtractAnswerSelectCreateArgs<S extends undefined | boolean | AnswerSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerSelectCreateArgs ? S['select'] : true;
export declare type ExtractAnswerIncludeCreateArgs<S extends undefined | boolean | AnswerIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerIncludeCreateArgs ? S['include'] : true;
/**
 * Answer update
 */
export declare type AnswerUpdateArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
    data: AnswerUpdateInput;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerUpdateArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
    data: AnswerUpdateInput;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerSelectUpdateArgs = {
    select: AnswerSelect;
    data: AnswerUpdateInput;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerSelectUpdateArgsOptional = {
    select?: AnswerSelect | null;
    data: AnswerUpdateInput;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerIncludeUpdateArgs = {
    include: AnswerInclude;
    data: AnswerUpdateInput;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerIncludeUpdateArgsOptional = {
    include?: AnswerInclude | null;
    data: AnswerUpdateInput;
    where: AnswerWhereUniqueInput;
};
export declare type ExtractAnswerSelectUpdateArgs<S extends undefined | boolean | AnswerSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerSelectUpdateArgs ? S['select'] : true;
export declare type ExtractAnswerIncludeUpdateArgs<S extends undefined | boolean | AnswerIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerIncludeUpdateArgs ? S['include'] : true;
/**
 * Answer updateMany
 */
export declare type AnswerUpdateManyArgs = {
    data: AnswerUpdateManyMutationInput;
    where?: AnswerWhereInput | null;
};
/**
 * Answer upsert
 */
export declare type AnswerUpsertArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
    where: AnswerWhereUniqueInput;
    create: AnswerCreateInput;
    update: AnswerUpdateInput;
};
export declare type AnswerUpsertArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
    where: AnswerWhereUniqueInput;
    create: AnswerCreateInput;
    update: AnswerUpdateInput;
};
export declare type AnswerSelectUpsertArgs = {
    select: AnswerSelect;
    where: AnswerWhereUniqueInput;
    create: AnswerCreateInput;
    update: AnswerUpdateInput;
};
export declare type AnswerSelectUpsertArgsOptional = {
    select?: AnswerSelect | null;
    where: AnswerWhereUniqueInput;
    create: AnswerCreateInput;
    update: AnswerUpdateInput;
};
export declare type AnswerIncludeUpsertArgs = {
    include: AnswerInclude;
    where: AnswerWhereUniqueInput;
    create: AnswerCreateInput;
    update: AnswerUpdateInput;
};
export declare type AnswerIncludeUpsertArgsOptional = {
    include?: AnswerInclude | null;
    where: AnswerWhereUniqueInput;
    create: AnswerCreateInput;
    update: AnswerUpdateInput;
};
export declare type ExtractAnswerSelectUpsertArgs<S extends undefined | boolean | AnswerSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerSelectUpsertArgs ? S['select'] : true;
export declare type ExtractAnswerIncludeUpsertArgs<S extends undefined | boolean | AnswerIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerIncludeUpsertArgs ? S['include'] : true;
/**
 * Answer delete
 */
export declare type AnswerDeleteArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerDeleteArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerSelectDeleteArgs = {
    select: AnswerSelect;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerSelectDeleteArgsOptional = {
    select?: AnswerSelect | null;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerIncludeDeleteArgs = {
    include: AnswerInclude;
    where: AnswerWhereUniqueInput;
};
export declare type AnswerIncludeDeleteArgsOptional = {
    include?: AnswerInclude | null;
    where: AnswerWhereUniqueInput;
};
export declare type ExtractAnswerSelectDeleteArgs<S extends undefined | boolean | AnswerSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerSelectDeleteArgs ? S['select'] : true;
export declare type ExtractAnswerIncludeDeleteArgs<S extends undefined | boolean | AnswerIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerIncludeDeleteArgs ? S['include'] : true;
/**
 * Answer deleteMany
 */
export declare type AnswerDeleteManyArgs = {
    where?: AnswerWhereInput | null;
};
/**
 * Answer without action
 */
export declare type AnswerArgs = {
    select?: AnswerSelect | null;
    include?: AnswerInclude | null;
};
export declare type AnswerArgsRequired = {
    select: AnswerSelect;
    include: AnswerInclude;
};
export declare type AnswerSelectArgs = {
    select: AnswerSelect;
};
export declare type AnswerSelectArgsOptional = {
    select?: AnswerSelect | null;
};
export declare type AnswerIncludeArgs = {
    include: AnswerInclude;
};
export declare type AnswerIncludeArgsOptional = {
    include?: AnswerInclude | null;
};
export declare type ExtractAnswerSelectArgs<S extends undefined | boolean | AnswerSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerSelectArgs ? S['select'] : true;
export declare type ExtractAnswerIncludeArgs<S extends undefined | boolean | AnswerIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends AnswerIncludeArgs ? S['include'] : true;
/**
 * Model Response
 */
export declare type Response = {
    id: number;
    uid: string;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
};
export declare type ResponseScalars = 'id' | 'uid' | 'submittedAt' | 'createdAt' | 'updatedAt';
export declare type ResponseSelect = {
    id?: boolean;
    uid?: boolean;
    submittedAt?: boolean;
    user?: boolean | UserSelectArgsOptional;
    form?: boolean | FormSelectArgsOptional;
    answers?: boolean | FindManyAnswerSelectArgsOptional;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export declare type ResponseInclude = {
    user?: boolean | UserIncludeArgsOptional;
    form?: boolean | FormIncludeArgsOptional;
    answers?: boolean | FindManyAnswerIncludeArgsOptional;
};
declare type ResponseDefault = {
    id: true;
    uid: true;
    submittedAt: true;
    createdAt: true;
    updatedAt: true;
};
declare type ResponseGetSelectPayload<S extends boolean | ResponseSelect> = S extends true ? Response : S extends ResponseSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends ResponseScalars ? Response[P] : P extends 'user' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : P extends 'form' ? FormGetSelectPayload<ExtractFormSelectArgs<S[P]>> : P extends 'answers' ? Array<AnswerGetSelectPayload<ExtractFindManyAnswerSelectArgs<S[P]>>> : never;
} : never;
declare type ResponseGetIncludePayload<S extends boolean | ResponseInclude> = S extends true ? Response : S extends ResponseInclude ? {
    [P in CleanupNever<MergeTruthyValues<ResponseDefault, S>>]: P extends ResponseScalars ? Response[P] : P extends 'user' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : P extends 'form' ? FormGetIncludePayload<ExtractFormIncludeArgs<S[P]>> : P extends 'answers' ? Array<AnswerGetIncludePayload<ExtractFindManyAnswerIncludeArgs<S[P]>>> : never;
} : never;
export interface ResponseDelegate {
    <T extends FindManyResponseArgs>(args?: Subset<T, FindManyResponseArgs>): T extends FindManyResponseArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyResponseSelectArgs ? Promise<Array<ResponseGetSelectPayload<ExtractFindManyResponseSelectArgs<T>>>> : T extends FindManyResponseIncludeArgs ? Promise<Array<ResponseGetIncludePayload<ExtractFindManyResponseIncludeArgs<T>>>> : Promise<Array<Response>>;
    findOne<T extends FindOneResponseArgs>(args: Subset<T, FindOneResponseArgs>): T extends FindOneResponseArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneResponseSelectArgs ? Promise<ResponseGetSelectPayload<ExtractFindOneResponseSelectArgs<T>>> : T extends FindOneResponseIncludeArgs ? Promise<ResponseGetIncludePayload<ExtractFindOneResponseIncludeArgs<T>>> : ResponseClient<Response>;
    findMany<T extends FindManyResponseArgs>(args?: Subset<T, FindManyResponseArgs>): T extends FindManyResponseArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyResponseSelectArgs ? Promise<Array<ResponseGetSelectPayload<ExtractFindManyResponseSelectArgs<T>>>> : T extends FindManyResponseIncludeArgs ? Promise<Array<ResponseGetIncludePayload<ExtractFindManyResponseIncludeArgs<T>>>> : Promise<Array<Response>>;
    create<T extends ResponseCreateArgs>(args: Subset<T, ResponseCreateArgs>): T extends ResponseCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends ResponseSelectCreateArgs ? Promise<ResponseGetSelectPayload<ExtractResponseSelectCreateArgs<T>>> : T extends ResponseIncludeCreateArgs ? Promise<ResponseGetIncludePayload<ExtractResponseIncludeCreateArgs<T>>> : ResponseClient<Response>;
    delete<T extends ResponseDeleteArgs>(args: Subset<T, ResponseDeleteArgs>): T extends ResponseDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends ResponseSelectDeleteArgs ? Promise<ResponseGetSelectPayload<ExtractResponseSelectDeleteArgs<T>>> : T extends ResponseIncludeDeleteArgs ? Promise<ResponseGetIncludePayload<ExtractResponseIncludeDeleteArgs<T>>> : ResponseClient<Response>;
    update<T extends ResponseUpdateArgs>(args: Subset<T, ResponseUpdateArgs>): T extends ResponseUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends ResponseSelectUpdateArgs ? Promise<ResponseGetSelectPayload<ExtractResponseSelectUpdateArgs<T>>> : T extends ResponseIncludeUpdateArgs ? Promise<ResponseGetIncludePayload<ExtractResponseIncludeUpdateArgs<T>>> : ResponseClient<Response>;
    deleteMany<T extends ResponseDeleteManyArgs>(args: Subset<T, ResponseDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends ResponseUpdateManyArgs>(args: Subset<T, ResponseUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends ResponseUpsertArgs>(args: Subset<T, ResponseUpsertArgs>): T extends ResponseUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends ResponseSelectUpsertArgs ? Promise<ResponseGetSelectPayload<ExtractResponseSelectUpsertArgs<T>>> : T extends ResponseIncludeUpsertArgs ? Promise<ResponseGetIncludePayload<ExtractResponseIncludeUpsertArgs<T>>> : ResponseClient<Response>;
}
export declare class ResponseClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>>> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>>> : UserClient<User>;
    form<T extends FormArgs = {}>(args?: Subset<T, FormArgs>): T extends FindOneFormArgsRequired ? 'Please either choose `select` or `include`' : T extends FormSelectArgs ? Promise<FormGetSelectPayload<ExtractFormSelectArgs<T>>> : T extends FormIncludeArgs ? Promise<FormGetIncludePayload<ExtractFormIncludeArgs<T>>> : FormClient<Form>;
    answers<T extends FindManyAnswerArgs = {}>(args?: Subset<T, FindManyAnswerArgs>): T extends FindManyAnswerArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyAnswerSelectArgs ? Promise<Array<AnswerGetSelectPayload<ExtractFindManyAnswerSelectArgs<T>>>> : T extends FindManyAnswerIncludeArgs ? Promise<Array<AnswerGetIncludePayload<ExtractFindManyAnswerIncludeArgs<T>>>> : Promise<Array<Answer>>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Response findOne
 */
export declare type FindOneResponseArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
    where: ResponseWhereUniqueInput;
};
export declare type FindOneResponseArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
    where: ResponseWhereUniqueInput;
};
export declare type FindOneResponseSelectArgs = {
    select: ResponseSelect;
    where: ResponseWhereUniqueInput;
};
export declare type FindOneResponseSelectArgsOptional = {
    select?: ResponseSelect | null;
    where: ResponseWhereUniqueInput;
};
export declare type FindOneResponseIncludeArgs = {
    include: ResponseInclude;
    where: ResponseWhereUniqueInput;
};
export declare type FindOneResponseIncludeArgsOptional = {
    include?: ResponseInclude | null;
    where: ResponseWhereUniqueInput;
};
export declare type ExtractFindOneResponseSelectArgs<S extends undefined | boolean | FindOneResponseSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneResponseSelectArgs ? S['select'] : true;
export declare type ExtractFindOneResponseIncludeArgs<S extends undefined | boolean | FindOneResponseIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneResponseIncludeArgs ? S['include'] : true;
/**
 * Response findMany
 */
export declare type FindManyResponseArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
    where?: ResponseWhereInput | null;
    orderBy?: ResponseOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyResponseArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
    where?: ResponseWhereInput | null;
    orderBy?: ResponseOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyResponseSelectArgs = {
    select: ResponseSelect;
    where?: ResponseWhereInput | null;
    orderBy?: ResponseOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyResponseSelectArgsOptional = {
    select?: ResponseSelect | null;
    where?: ResponseWhereInput | null;
    orderBy?: ResponseOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyResponseIncludeArgs = {
    include: ResponseInclude;
    where?: ResponseWhereInput | null;
    orderBy?: ResponseOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyResponseIncludeArgsOptional = {
    include?: ResponseInclude | null;
    where?: ResponseWhereInput | null;
    orderBy?: ResponseOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyResponseSelectArgs<S extends undefined | boolean | FindManyResponseSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyResponseSelectArgs ? S['select'] : true;
export declare type ExtractFindManyResponseIncludeArgs<S extends undefined | boolean | FindManyResponseIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyResponseIncludeArgs ? S['include'] : true;
/**
 * Response create
 */
export declare type ResponseCreateArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
    data: ResponseCreateInput;
};
export declare type ResponseCreateArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
    data: ResponseCreateInput;
};
export declare type ResponseSelectCreateArgs = {
    select: ResponseSelect;
    data: ResponseCreateInput;
};
export declare type ResponseSelectCreateArgsOptional = {
    select?: ResponseSelect | null;
    data: ResponseCreateInput;
};
export declare type ResponseIncludeCreateArgs = {
    include: ResponseInclude;
    data: ResponseCreateInput;
};
export declare type ResponseIncludeCreateArgsOptional = {
    include?: ResponseInclude | null;
    data: ResponseCreateInput;
};
export declare type ExtractResponseSelectCreateArgs<S extends undefined | boolean | ResponseSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseSelectCreateArgs ? S['select'] : true;
export declare type ExtractResponseIncludeCreateArgs<S extends undefined | boolean | ResponseIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseIncludeCreateArgs ? S['include'] : true;
/**
 * Response update
 */
export declare type ResponseUpdateArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
    data: ResponseUpdateInput;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseUpdateArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
    data: ResponseUpdateInput;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseSelectUpdateArgs = {
    select: ResponseSelect;
    data: ResponseUpdateInput;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseSelectUpdateArgsOptional = {
    select?: ResponseSelect | null;
    data: ResponseUpdateInput;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseIncludeUpdateArgs = {
    include: ResponseInclude;
    data: ResponseUpdateInput;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseIncludeUpdateArgsOptional = {
    include?: ResponseInclude | null;
    data: ResponseUpdateInput;
    where: ResponseWhereUniqueInput;
};
export declare type ExtractResponseSelectUpdateArgs<S extends undefined | boolean | ResponseSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseSelectUpdateArgs ? S['select'] : true;
export declare type ExtractResponseIncludeUpdateArgs<S extends undefined | boolean | ResponseIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseIncludeUpdateArgs ? S['include'] : true;
/**
 * Response updateMany
 */
export declare type ResponseUpdateManyArgs = {
    data: ResponseUpdateManyMutationInput;
    where?: ResponseWhereInput | null;
};
/**
 * Response upsert
 */
export declare type ResponseUpsertArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
    where: ResponseWhereUniqueInput;
    create: ResponseCreateInput;
    update: ResponseUpdateInput;
};
export declare type ResponseUpsertArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
    where: ResponseWhereUniqueInput;
    create: ResponseCreateInput;
    update: ResponseUpdateInput;
};
export declare type ResponseSelectUpsertArgs = {
    select: ResponseSelect;
    where: ResponseWhereUniqueInput;
    create: ResponseCreateInput;
    update: ResponseUpdateInput;
};
export declare type ResponseSelectUpsertArgsOptional = {
    select?: ResponseSelect | null;
    where: ResponseWhereUniqueInput;
    create: ResponseCreateInput;
    update: ResponseUpdateInput;
};
export declare type ResponseIncludeUpsertArgs = {
    include: ResponseInclude;
    where: ResponseWhereUniqueInput;
    create: ResponseCreateInput;
    update: ResponseUpdateInput;
};
export declare type ResponseIncludeUpsertArgsOptional = {
    include?: ResponseInclude | null;
    where: ResponseWhereUniqueInput;
    create: ResponseCreateInput;
    update: ResponseUpdateInput;
};
export declare type ExtractResponseSelectUpsertArgs<S extends undefined | boolean | ResponseSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseSelectUpsertArgs ? S['select'] : true;
export declare type ExtractResponseIncludeUpsertArgs<S extends undefined | boolean | ResponseIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseIncludeUpsertArgs ? S['include'] : true;
/**
 * Response delete
 */
export declare type ResponseDeleteArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseDeleteArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseSelectDeleteArgs = {
    select: ResponseSelect;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseSelectDeleteArgsOptional = {
    select?: ResponseSelect | null;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseIncludeDeleteArgs = {
    include: ResponseInclude;
    where: ResponseWhereUniqueInput;
};
export declare type ResponseIncludeDeleteArgsOptional = {
    include?: ResponseInclude | null;
    where: ResponseWhereUniqueInput;
};
export declare type ExtractResponseSelectDeleteArgs<S extends undefined | boolean | ResponseSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseSelectDeleteArgs ? S['select'] : true;
export declare type ExtractResponseIncludeDeleteArgs<S extends undefined | boolean | ResponseIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseIncludeDeleteArgs ? S['include'] : true;
/**
 * Response deleteMany
 */
export declare type ResponseDeleteManyArgs = {
    where?: ResponseWhereInput | null;
};
/**
 * Response without action
 */
export declare type ResponseArgs = {
    select?: ResponseSelect | null;
    include?: ResponseInclude | null;
};
export declare type ResponseArgsRequired = {
    select: ResponseSelect;
    include: ResponseInclude;
};
export declare type ResponseSelectArgs = {
    select: ResponseSelect;
};
export declare type ResponseSelectArgsOptional = {
    select?: ResponseSelect | null;
};
export declare type ResponseIncludeArgs = {
    include: ResponseInclude;
};
export declare type ResponseIncludeArgsOptional = {
    include?: ResponseInclude | null;
};
export declare type ExtractResponseSelectArgs<S extends undefined | boolean | ResponseSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseSelectArgs ? S['select'] : true;
export declare type ExtractResponseIncludeArgs<S extends undefined | boolean | ResponseIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends ResponseIncludeArgs ? S['include'] : true;
/**
 * Model User
 */
export declare type User = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
};
export declare type UserScalars = 'id' | 'email' | 'createdAt' | 'updatedAt';
export declare type UserSelect = {
    id?: boolean;
    email?: boolean;
    responses?: boolean | FindManyResponseSelectArgsOptional;
    note?: boolean | NoteSelectArgsOptional;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export declare type UserInclude = {
    responses?: boolean | FindManyResponseIncludeArgsOptional;
    note?: boolean | NoteIncludeArgsOptional;
};
declare type UserDefault = {
    id: true;
    email: true;
    createdAt: true;
    updatedAt: true;
};
declare type UserGetSelectPayload<S extends boolean | UserSelect> = S extends true ? User : S extends UserSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends UserScalars ? User[P] : P extends 'responses' ? Array<ResponseGetSelectPayload<ExtractFindManyResponseSelectArgs<S[P]>>> : P extends 'note' ? NoteGetSelectPayload<ExtractNoteSelectArgs<S[P]>> : never;
} : never;
declare type UserGetIncludePayload<S extends boolean | UserInclude> = S extends true ? User : S extends UserInclude ? {
    [P in CleanupNever<MergeTruthyValues<UserDefault, S>>]: P extends UserScalars ? User[P] : P extends 'responses' ? Array<ResponseGetIncludePayload<ExtractFindManyResponseIncludeArgs<S[P]>>> : P extends 'note' ? NoteGetIncludePayload<ExtractNoteIncludeArgs<S[P]>> : never;
} : never;
export interface UserDelegate {
    <T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    findOne<T extends FindOneUserArgs>(args: Subset<T, FindOneUserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneUserSelectArgs ? Promise<UserGetSelectPayload<ExtractFindOneUserSelectArgs<T>>> : T extends FindOneUserIncludeArgs ? Promise<UserGetIncludePayload<ExtractFindOneUserIncludeArgs<T>>> : UserClient<User>;
    findMany<T extends FindManyUserArgs>(args?: Subset<T, FindManyUserArgs>): T extends FindManyUserArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyUserSelectArgs ? Promise<Array<UserGetSelectPayload<ExtractFindManyUserSelectArgs<T>>>> : T extends FindManyUserIncludeArgs ? Promise<Array<UserGetIncludePayload<ExtractFindManyUserIncludeArgs<T>>>> : Promise<Array<User>>;
    create<T extends UserCreateArgs>(args: Subset<T, UserCreateArgs>): T extends UserCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectCreateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectCreateArgs<T>>> : T extends UserIncludeCreateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeCreateArgs<T>>> : UserClient<User>;
    delete<T extends UserDeleteArgs>(args: Subset<T, UserDeleteArgs>): T extends UserDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectDeleteArgs ? Promise<UserGetSelectPayload<ExtractUserSelectDeleteArgs<T>>> : T extends UserIncludeDeleteArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeDeleteArgs<T>>> : UserClient<User>;
    update<T extends UserUpdateArgs>(args: Subset<T, UserUpdateArgs>): T extends UserUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpdateArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpdateArgs<T>>> : T extends UserIncludeUpdateArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpdateArgs<T>>> : UserClient<User>;
    deleteMany<T extends UserDeleteManyArgs>(args: Subset<T, UserDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Subset<T, UserUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends UserUpsertArgs>(args: Subset<T, UserUpsertArgs>): T extends UserUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectUpsertArgs ? Promise<UserGetSelectPayload<ExtractUserSelectUpsertArgs<T>>> : T extends UserIncludeUpsertArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeUpsertArgs<T>>> : UserClient<User>;
}
export declare class UserClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    responses<T extends FindManyResponseArgs = {}>(args?: Subset<T, FindManyResponseArgs>): T extends FindManyResponseArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyResponseSelectArgs ? Promise<Array<ResponseGetSelectPayload<ExtractFindManyResponseSelectArgs<T>>>> : T extends FindManyResponseIncludeArgs ? Promise<Array<ResponseGetIncludePayload<ExtractFindManyResponseIncludeArgs<T>>>> : Promise<Array<Response>>;
    note<T extends NoteArgs = {}>(args?: Subset<T, NoteArgs>): T extends FindOneNoteArgsRequired ? 'Please either choose `select` or `include`' : T extends NoteSelectArgs ? Promise<NoteGetSelectPayload<ExtractNoteSelectArgs<T>>> : T extends NoteIncludeArgs ? Promise<NoteGetIncludePayload<ExtractNoteIncludeArgs<T>>> : NoteClient<Note>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * User findOne
 */
export declare type FindOneUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserSelectArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type FindOneUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractFindOneUserSelectArgs<S extends undefined | boolean | FindOneUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserSelectArgs ? S['select'] : true;
export declare type ExtractFindOneUserIncludeArgs<S extends undefined | boolean | FindOneUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneUserIncludeArgs ? S['include'] : true;
/**
 * User findMany
 */
export declare type FindManyUserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgs = {
    select: UserSelect;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserSelectArgsOptional = {
    select?: UserSelect | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgs = {
    include: UserInclude;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyUserIncludeArgsOptional = {
    include?: UserInclude | null;
    where?: UserWhereInput | null;
    orderBy?: UserOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyUserSelectArgs<S extends undefined | boolean | FindManyUserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserSelectArgs ? S['select'] : true;
export declare type ExtractFindManyUserIncludeArgs<S extends undefined | boolean | FindManyUserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyUserIncludeArgs ? S['include'] : true;
/**
 * User create
 */
export declare type UserCreateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type UserCreateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgs = {
    select: UserSelect;
    data: UserCreateInput;
};
export declare type UserSelectCreateArgsOptional = {
    select?: UserSelect | null;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgs = {
    include: UserInclude;
    data: UserCreateInput;
};
export declare type UserIncludeCreateArgsOptional = {
    include?: UserInclude | null;
    data: UserCreateInput;
};
export declare type ExtractUserSelectCreateArgs<S extends undefined | boolean | UserSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectCreateArgs ? S['select'] : true;
export declare type ExtractUserIncludeCreateArgs<S extends undefined | boolean | UserIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeCreateArgs ? S['include'] : true;
/**
 * User update
 */
export declare type UserUpdateArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserUpdateArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgs = {
    select: UserSelect;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserSelectUpdateArgsOptional = {
    select?: UserSelect | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgs = {
    include: UserInclude;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeUpdateArgsOptional = {
    include?: UserInclude | null;
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectUpdateArgs<S extends undefined | boolean | UserSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpdateArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpdateArgs<S extends undefined | boolean | UserIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpdateArgs ? S['include'] : true;
/**
 * User updateMany
 */
export declare type UserUpdateManyArgs = {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput | null;
};
/**
 * User upsert
 */
export declare type UserUpsertArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserUpsertArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserSelectUpsertArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type UserIncludeUpsertArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
};
export declare type ExtractUserSelectUpsertArgs<S extends undefined | boolean | UserSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectUpsertArgs ? S['select'] : true;
export declare type ExtractUserIncludeUpsertArgs<S extends undefined | boolean | UserIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeUpsertArgs ? S['include'] : true;
/**
 * User delete
 */
export declare type UserDeleteArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type UserDeleteArgsRequired = {
    select: UserSelect;
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgs = {
    select: UserSelect;
    where: UserWhereUniqueInput;
};
export declare type UserSelectDeleteArgsOptional = {
    select?: UserSelect | null;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgs = {
    include: UserInclude;
    where: UserWhereUniqueInput;
};
export declare type UserIncludeDeleteArgsOptional = {
    include?: UserInclude | null;
    where: UserWhereUniqueInput;
};
export declare type ExtractUserSelectDeleteArgs<S extends undefined | boolean | UserSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectDeleteArgs ? S['select'] : true;
export declare type ExtractUserIncludeDeleteArgs<S extends undefined | boolean | UserIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeDeleteArgs ? S['include'] : true;
/**
 * User deleteMany
 */
export declare type UserDeleteManyArgs = {
    where?: UserWhereInput | null;
};
/**
 * User without action
 */
export declare type UserArgs = {
    select?: UserSelect | null;
    include?: UserInclude | null;
};
export declare type UserArgsRequired = {
    select: UserSelect;
    include: UserInclude;
};
export declare type UserSelectArgs = {
    select: UserSelect;
};
export declare type UserSelectArgsOptional = {
    select?: UserSelect | null;
};
export declare type UserIncludeArgs = {
    include: UserInclude;
};
export declare type UserIncludeArgsOptional = {
    include?: UserInclude | null;
};
export declare type ExtractUserSelectArgs<S extends undefined | boolean | UserSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserSelectArgs ? S['select'] : true;
export declare type ExtractUserIncludeArgs<S extends undefined | boolean | UserIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends UserIncludeArgs ? S['include'] : true;
/**
 * Model Note
 */
export declare type Note = {
    id: number;
    text: string;
};
export declare type NoteScalars = 'id' | 'text';
export declare type NoteSelect = {
    id?: boolean;
    text?: boolean;
    user?: boolean | UserSelectArgsOptional;
};
export declare type NoteInclude = {
    user?: boolean | UserIncludeArgsOptional;
};
declare type NoteDefault = {
    id: true;
    text: true;
};
declare type NoteGetSelectPayload<S extends boolean | NoteSelect> = S extends true ? Note : S extends NoteSelect ? {
    [P in CleanupNever<MergeTruthyValues<{}, S>>]: P extends NoteScalars ? Note[P] : P extends 'user' ? UserGetSelectPayload<ExtractUserSelectArgs<S[P]>> : never;
} : never;
declare type NoteGetIncludePayload<S extends boolean | NoteInclude> = S extends true ? Note : S extends NoteInclude ? {
    [P in CleanupNever<MergeTruthyValues<NoteDefault, S>>]: P extends NoteScalars ? Note[P] : P extends 'user' ? UserGetIncludePayload<ExtractUserIncludeArgs<S[P]>> : never;
} : never;
export interface NoteDelegate {
    <T extends FindManyNoteArgs>(args?: Subset<T, FindManyNoteArgs>): T extends FindManyNoteArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyNoteSelectArgs ? Promise<Array<NoteGetSelectPayload<ExtractFindManyNoteSelectArgs<T>>>> : T extends FindManyNoteIncludeArgs ? Promise<Array<NoteGetIncludePayload<ExtractFindManyNoteIncludeArgs<T>>>> : Promise<Array<Note>>;
    findOne<T extends FindOneNoteArgs>(args: Subset<T, FindOneNoteArgs>): T extends FindOneNoteArgsRequired ? 'Please either choose `select` or `include`' : T extends FindOneNoteSelectArgs ? Promise<NoteGetSelectPayload<ExtractFindOneNoteSelectArgs<T>>> : T extends FindOneNoteIncludeArgs ? Promise<NoteGetIncludePayload<ExtractFindOneNoteIncludeArgs<T>>> : NoteClient<Note>;
    findMany<T extends FindManyNoteArgs>(args?: Subset<T, FindManyNoteArgs>): T extends FindManyNoteArgsRequired ? 'Please either choose `select` or `include`' : T extends FindManyNoteSelectArgs ? Promise<Array<NoteGetSelectPayload<ExtractFindManyNoteSelectArgs<T>>>> : T extends FindManyNoteIncludeArgs ? Promise<Array<NoteGetIncludePayload<ExtractFindManyNoteIncludeArgs<T>>>> : Promise<Array<Note>>;
    create<T extends NoteCreateArgs>(args: Subset<T, NoteCreateArgs>): T extends NoteCreateArgsRequired ? 'Please either choose `select` or `include`' : T extends NoteSelectCreateArgs ? Promise<NoteGetSelectPayload<ExtractNoteSelectCreateArgs<T>>> : T extends NoteIncludeCreateArgs ? Promise<NoteGetIncludePayload<ExtractNoteIncludeCreateArgs<T>>> : NoteClient<Note>;
    delete<T extends NoteDeleteArgs>(args: Subset<T, NoteDeleteArgs>): T extends NoteDeleteArgsRequired ? 'Please either choose `select` or `include`' : T extends NoteSelectDeleteArgs ? Promise<NoteGetSelectPayload<ExtractNoteSelectDeleteArgs<T>>> : T extends NoteIncludeDeleteArgs ? Promise<NoteGetIncludePayload<ExtractNoteIncludeDeleteArgs<T>>> : NoteClient<Note>;
    update<T extends NoteUpdateArgs>(args: Subset<T, NoteUpdateArgs>): T extends NoteUpdateArgsRequired ? 'Please either choose `select` or `include`' : T extends NoteSelectUpdateArgs ? Promise<NoteGetSelectPayload<ExtractNoteSelectUpdateArgs<T>>> : T extends NoteIncludeUpdateArgs ? Promise<NoteGetIncludePayload<ExtractNoteIncludeUpdateArgs<T>>> : NoteClient<Note>;
    deleteMany<T extends NoteDeleteManyArgs>(args: Subset<T, NoteDeleteManyArgs>): Promise<BatchPayload>;
    updateMany<T extends NoteUpdateManyArgs>(args: Subset<T, NoteUpdateManyArgs>): Promise<BatchPayload>;
    upsert<T extends NoteUpsertArgs>(args: Subset<T, NoteUpsertArgs>): T extends NoteUpsertArgsRequired ? 'Please either choose `select` or `include`' : T extends NoteSelectUpsertArgs ? Promise<NoteGetSelectPayload<ExtractNoteSelectUpsertArgs<T>>> : T extends NoteIncludeUpsertArgs ? Promise<NoteGetIncludePayload<ExtractNoteIncludeUpsertArgs<T>>> : NoteClient<Note>;
}
export declare class NoteClient<T> implements Promise<T> {
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _path;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: DMMFClass, _fetcher: PhotonFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _path: string[], _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PhotonPromise';
    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): T extends FindOneUserArgsRequired ? 'Please either choose `select` or `include`' : T extends UserSelectArgs ? Promise<UserGetSelectPayload<ExtractUserSelectArgs<T>>> : T extends UserIncludeArgs ? Promise<UserGetIncludePayload<ExtractUserIncludeArgs<T>>> : UserClient<User>;
    private readonly _document;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}
/**
 * Note findOne
 */
export declare type FindOneNoteArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
    where: NoteWhereUniqueInput;
};
export declare type FindOneNoteArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
    where: NoteWhereUniqueInput;
};
export declare type FindOneNoteSelectArgs = {
    select: NoteSelect;
    where: NoteWhereUniqueInput;
};
export declare type FindOneNoteSelectArgsOptional = {
    select?: NoteSelect | null;
    where: NoteWhereUniqueInput;
};
export declare type FindOneNoteIncludeArgs = {
    include: NoteInclude;
    where: NoteWhereUniqueInput;
};
export declare type FindOneNoteIncludeArgsOptional = {
    include?: NoteInclude | null;
    where: NoteWhereUniqueInput;
};
export declare type ExtractFindOneNoteSelectArgs<S extends undefined | boolean | FindOneNoteSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneNoteSelectArgs ? S['select'] : true;
export declare type ExtractFindOneNoteIncludeArgs<S extends undefined | boolean | FindOneNoteIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindOneNoteIncludeArgs ? S['include'] : true;
/**
 * Note findMany
 */
export declare type FindManyNoteArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
    where?: NoteWhereInput | null;
    orderBy?: NoteOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyNoteArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
    where?: NoteWhereInput | null;
    orderBy?: NoteOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyNoteSelectArgs = {
    select: NoteSelect;
    where?: NoteWhereInput | null;
    orderBy?: NoteOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyNoteSelectArgsOptional = {
    select?: NoteSelect | null;
    where?: NoteWhereInput | null;
    orderBy?: NoteOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyNoteIncludeArgs = {
    include: NoteInclude;
    where?: NoteWhereInput | null;
    orderBy?: NoteOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type FindManyNoteIncludeArgsOptional = {
    include?: NoteInclude | null;
    where?: NoteWhereInput | null;
    orderBy?: NoteOrderByInput | null;
    skip?: number | null;
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
};
export declare type ExtractFindManyNoteSelectArgs<S extends undefined | boolean | FindManyNoteSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyNoteSelectArgs ? S['select'] : true;
export declare type ExtractFindManyNoteIncludeArgs<S extends undefined | boolean | FindManyNoteIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends FindManyNoteIncludeArgs ? S['include'] : true;
/**
 * Note create
 */
export declare type NoteCreateArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
    data: NoteCreateInput;
};
export declare type NoteCreateArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
    data: NoteCreateInput;
};
export declare type NoteSelectCreateArgs = {
    select: NoteSelect;
    data: NoteCreateInput;
};
export declare type NoteSelectCreateArgsOptional = {
    select?: NoteSelect | null;
    data: NoteCreateInput;
};
export declare type NoteIncludeCreateArgs = {
    include: NoteInclude;
    data: NoteCreateInput;
};
export declare type NoteIncludeCreateArgsOptional = {
    include?: NoteInclude | null;
    data: NoteCreateInput;
};
export declare type ExtractNoteSelectCreateArgs<S extends undefined | boolean | NoteSelectCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteSelectCreateArgs ? S['select'] : true;
export declare type ExtractNoteIncludeCreateArgs<S extends undefined | boolean | NoteIncludeCreateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteIncludeCreateArgs ? S['include'] : true;
/**
 * Note update
 */
export declare type NoteUpdateArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
    data: NoteUpdateInput;
    where: NoteWhereUniqueInput;
};
export declare type NoteUpdateArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
    data: NoteUpdateInput;
    where: NoteWhereUniqueInput;
};
export declare type NoteSelectUpdateArgs = {
    select: NoteSelect;
    data: NoteUpdateInput;
    where: NoteWhereUniqueInput;
};
export declare type NoteSelectUpdateArgsOptional = {
    select?: NoteSelect | null;
    data: NoteUpdateInput;
    where: NoteWhereUniqueInput;
};
export declare type NoteIncludeUpdateArgs = {
    include: NoteInclude;
    data: NoteUpdateInput;
    where: NoteWhereUniqueInput;
};
export declare type NoteIncludeUpdateArgsOptional = {
    include?: NoteInclude | null;
    data: NoteUpdateInput;
    where: NoteWhereUniqueInput;
};
export declare type ExtractNoteSelectUpdateArgs<S extends undefined | boolean | NoteSelectUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteSelectUpdateArgs ? S['select'] : true;
export declare type ExtractNoteIncludeUpdateArgs<S extends undefined | boolean | NoteIncludeUpdateArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteIncludeUpdateArgs ? S['include'] : true;
/**
 * Note updateMany
 */
export declare type NoteUpdateManyArgs = {
    data: NoteUpdateManyMutationInput;
    where?: NoteWhereInput | null;
};
/**
 * Note upsert
 */
export declare type NoteUpsertArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
    where: NoteWhereUniqueInput;
    create: NoteCreateInput;
    update: NoteUpdateInput;
};
export declare type NoteUpsertArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
    where: NoteWhereUniqueInput;
    create: NoteCreateInput;
    update: NoteUpdateInput;
};
export declare type NoteSelectUpsertArgs = {
    select: NoteSelect;
    where: NoteWhereUniqueInput;
    create: NoteCreateInput;
    update: NoteUpdateInput;
};
export declare type NoteSelectUpsertArgsOptional = {
    select?: NoteSelect | null;
    where: NoteWhereUniqueInput;
    create: NoteCreateInput;
    update: NoteUpdateInput;
};
export declare type NoteIncludeUpsertArgs = {
    include: NoteInclude;
    where: NoteWhereUniqueInput;
    create: NoteCreateInput;
    update: NoteUpdateInput;
};
export declare type NoteIncludeUpsertArgsOptional = {
    include?: NoteInclude | null;
    where: NoteWhereUniqueInput;
    create: NoteCreateInput;
    update: NoteUpdateInput;
};
export declare type ExtractNoteSelectUpsertArgs<S extends undefined | boolean | NoteSelectUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteSelectUpsertArgs ? S['select'] : true;
export declare type ExtractNoteIncludeUpsertArgs<S extends undefined | boolean | NoteIncludeUpsertArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteIncludeUpsertArgs ? S['include'] : true;
/**
 * Note delete
 */
export declare type NoteDeleteArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
    where: NoteWhereUniqueInput;
};
export declare type NoteDeleteArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
    where: NoteWhereUniqueInput;
};
export declare type NoteSelectDeleteArgs = {
    select: NoteSelect;
    where: NoteWhereUniqueInput;
};
export declare type NoteSelectDeleteArgsOptional = {
    select?: NoteSelect | null;
    where: NoteWhereUniqueInput;
};
export declare type NoteIncludeDeleteArgs = {
    include: NoteInclude;
    where: NoteWhereUniqueInput;
};
export declare type NoteIncludeDeleteArgsOptional = {
    include?: NoteInclude | null;
    where: NoteWhereUniqueInput;
};
export declare type ExtractNoteSelectDeleteArgs<S extends undefined | boolean | NoteSelectDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteSelectDeleteArgs ? S['select'] : true;
export declare type ExtractNoteIncludeDeleteArgs<S extends undefined | boolean | NoteIncludeDeleteArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteIncludeDeleteArgs ? S['include'] : true;
/**
 * Note deleteMany
 */
export declare type NoteDeleteManyArgs = {
    where?: NoteWhereInput | null;
};
/**
 * Note without action
 */
export declare type NoteArgs = {
    select?: NoteSelect | null;
    include?: NoteInclude | null;
};
export declare type NoteArgsRequired = {
    select: NoteSelect;
    include: NoteInclude;
};
export declare type NoteSelectArgs = {
    select: NoteSelect;
};
export declare type NoteSelectArgsOptional = {
    select?: NoteSelect | null;
};
export declare type NoteIncludeArgs = {
    include: NoteInclude;
};
export declare type NoteIncludeArgsOptional = {
    include?: NoteInclude | null;
};
export declare type ExtractNoteSelectArgs<S extends undefined | boolean | NoteSelectArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteSelectArgs ? S['select'] : true;
export declare type ExtractNoteIncludeArgs<S extends undefined | boolean | NoteIncludeArgsOptional> = S extends undefined ? false : S extends boolean ? S : S extends NoteIncludeArgs ? S['include'] : true;
/**
 * Deep Input Types
 */
export declare type NoteWhereInput = {
    id?: number | IntFilter | null;
    text?: string | StringFilter | null;
    AND?: Enumerable<NoteWhereInput>;
    OR?: Enumerable<NoteWhereInput>;
    NOT?: Enumerable<NoteWhereInput>;
    user?: UserWhereInput | null;
};
export declare type UserWhereInput = {
    id?: number | IntFilter | null;
    email?: string | StringFilter | null;
    responses?: ResponseFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<UserWhereInput>;
    OR?: Enumerable<UserWhereInput>;
    NOT?: Enumerable<UserWhereInput>;
    note?: NoteWhereInput | null;
};
export declare type ResponseWhereInput = {
    id?: number | IntFilter | null;
    uid?: string | StringFilter | null;
    submittedAt?: string | Date | DateTimeFilter | null;
    answers?: AnswerFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<ResponseWhereInput>;
    OR?: Enumerable<ResponseWhereInput>;
    NOT?: Enumerable<ResponseWhereInput>;
    user?: UserWhereInput | null;
    form?: FormWhereInput | null;
};
export declare type AnswerWhereInput = {
    id?: number | IntFilter | null;
    text?: string | StringFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<AnswerWhereInput>;
    OR?: Enumerable<AnswerWhereInput>;
    NOT?: Enumerable<AnswerWhereInput>;
    question?: QuestionWhereInput | null;
    response?: ResponseWhereInput | null;
};
export declare type QuestionWhereInput = {
    id?: number | IntFilter | null;
    uid?: string | StringFilter | null;
    type?: string | StringFilter | null;
    text?: string | StringFilter | null;
    answers?: AnswerFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<QuestionWhereInput>;
    OR?: Enumerable<QuestionWhereInput>;
    NOT?: Enumerable<QuestionWhereInput>;
    form?: FormWhereInput | null;
};
export declare type FormWhereInput = {
    id?: number | IntFilter | null;
    uid?: string | StringFilter | null;
    name?: string | StringFilter | null;
    tag?: string | StringFilter | null;
    questions?: QuestionFilter | null;
    responses?: ResponseFilter | null;
    AND?: Enumerable<FormWhereInput>;
    OR?: Enumerable<FormWhereInput>;
    NOT?: Enumerable<FormWhereInput>;
};
export declare type FormWhereUniqueInput = {
    id?: number | null;
    uid?: string | null;
};
export declare type QuestionWhereUniqueInput = {
    id?: number | null;
    uid?: string | null;
};
export declare type AnswerWhereUniqueInput = {
    id?: number | null;
};
export declare type ResponseWhereUniqueInput = {
    id?: number | null;
    uid?: string | null;
};
export declare type UserWhereUniqueInput = {
    id?: number | null;
    email?: string | null;
};
export declare type NoteWhereUniqueInput = {
    id?: number | null;
};
export declare type NoteCreateWithoutUserInput = {
    text: string;
};
export declare type NoteCreateOneWithoutNoteInput = {
    create?: NoteCreateWithoutUserInput | null;
    connect?: NoteWhereUniqueInput | null;
};
export declare type UserCreateWithoutResponsesInput = {
    email: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    note?: NoteCreateOneWithoutNoteInput | null;
};
export declare type UserCreateOneWithoutUserInput = {
    create?: UserCreateWithoutResponsesInput | null;
    connect?: UserWhereUniqueInput | null;
};
export declare type FormCreateWithoutResponsesInput = {
    uid: string;
    name: string;
    tag: string;
    questions?: QuestionCreateManyWithoutQuestionsInput | null;
};
export declare type FormCreateOneWithoutFormInput = {
    create?: FormCreateWithoutResponsesInput | null;
    connect?: FormWhereUniqueInput | null;
};
export declare type ResponseCreateWithoutAnswersInput = {
    uid: string;
    submittedAt: string | Date;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    user?: UserCreateOneWithoutUserInput | null;
    form?: FormCreateOneWithoutFormInput | null;
};
export declare type ResponseCreateOneWithoutResponseInput = {
    create?: ResponseCreateWithoutAnswersInput | null;
    connect?: ResponseWhereUniqueInput | null;
};
export declare type AnswerCreateWithoutQuestionInput = {
    text: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    response?: ResponseCreateOneWithoutResponseInput | null;
};
export declare type AnswerCreateManyWithoutAnswersInput = {
    create?: Enumerable<AnswerCreateWithoutQuestionInput>;
    connect?: Enumerable<AnswerWhereUniqueInput>;
};
export declare type QuestionCreateWithoutFormInput = {
    uid: string;
    type: string;
    text: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    answers?: AnswerCreateManyWithoutAnswersInput | null;
};
export declare type QuestionCreateManyWithoutQuestionsInput = {
    create?: Enumerable<QuestionCreateWithoutFormInput>;
    connect?: Enumerable<QuestionWhereUniqueInput>;
};
export declare type ResponseCreateWithoutFormInput = {
    uid: string;
    submittedAt: string | Date;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    user?: UserCreateOneWithoutUserInput | null;
    answers?: AnswerCreateManyWithoutAnswersInput | null;
};
export declare type ResponseCreateManyWithoutResponsesInput = {
    create?: Enumerable<ResponseCreateWithoutFormInput>;
    connect?: Enumerable<ResponseWhereUniqueInput>;
};
export declare type FormCreateInput = {
    uid: string;
    name: string;
    tag: string;
    questions?: QuestionCreateManyWithoutQuestionsInput | null;
    responses?: ResponseCreateManyWithoutResponsesInput | null;
};
export declare type NoteUpdateWithoutUserDataInput = {
    id?: number | null;
    text?: string | null;
};
export declare type NoteUpsertWithoutUserInput = {
    update: NoteUpdateWithoutUserDataInput;
    create: NoteCreateWithoutUserInput;
};
export declare type NoteUpdateOneWithoutUserInput = {
    create?: NoteCreateWithoutUserInput | null;
    connect?: NoteWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: NoteUpdateWithoutUserDataInput | null;
    upsert?: NoteUpsertWithoutUserInput | null;
};
export declare type UserUpdateWithoutResponsesDataInput = {
    id?: number | null;
    email?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    note?: NoteUpdateOneWithoutUserInput | null;
};
export declare type UserUpsertWithoutResponsesInput = {
    update: UserUpdateWithoutResponsesDataInput;
    create: UserCreateWithoutResponsesInput;
};
export declare type UserUpdateOneWithoutResponsesInput = {
    create?: UserCreateWithoutResponsesInput | null;
    connect?: UserWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: UserUpdateWithoutResponsesDataInput | null;
    upsert?: UserUpsertWithoutResponsesInput | null;
};
export declare type FormUpdateWithoutResponsesDataInput = {
    id?: number | null;
    uid?: string | null;
    name?: string | null;
    tag?: string | null;
    questions?: QuestionUpdateManyWithoutFormInput | null;
};
export declare type FormUpsertWithoutResponsesInput = {
    update: FormUpdateWithoutResponsesDataInput;
    create: FormCreateWithoutResponsesInput;
};
export declare type FormUpdateOneWithoutResponsesInput = {
    create?: FormCreateWithoutResponsesInput | null;
    connect?: FormWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: FormUpdateWithoutResponsesDataInput | null;
    upsert?: FormUpsertWithoutResponsesInput | null;
};
export declare type ResponseUpdateWithoutAnswersDataInput = {
    id?: number | null;
    uid?: string | null;
    submittedAt?: string | Date | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    user?: UserUpdateOneWithoutResponsesInput | null;
    form?: FormUpdateOneWithoutResponsesInput | null;
};
export declare type ResponseUpsertWithoutAnswersInput = {
    update: ResponseUpdateWithoutAnswersDataInput;
    create: ResponseCreateWithoutAnswersInput;
};
export declare type ResponseUpdateOneWithoutAnswersInput = {
    create?: ResponseCreateWithoutAnswersInput | null;
    connect?: ResponseWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: ResponseUpdateWithoutAnswersDataInput | null;
    upsert?: ResponseUpsertWithoutAnswersInput | null;
};
export declare type AnswerUpdateWithoutQuestionDataInput = {
    id?: number | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    response?: ResponseUpdateOneWithoutAnswersInput | null;
};
export declare type AnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: AnswerWhereUniqueInput;
    data: AnswerUpdateWithoutQuestionDataInput;
};
export declare type AnswerScalarWhereInput = {
    id?: number | IntFilter | null;
    text?: string | StringFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<AnswerScalarWhereInput>;
    OR?: Enumerable<AnswerScalarWhereInput>;
    NOT?: Enumerable<AnswerScalarWhereInput>;
};
export declare type AnswerUpdateManyDataInput = {
    id?: number | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type AnswerUpdateManyWithWhereNestedInput = {
    where: AnswerScalarWhereInput;
    data: AnswerUpdateManyDataInput;
};
export declare type AnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: AnswerWhereUniqueInput;
    update: AnswerUpdateWithoutQuestionDataInput;
    create: AnswerCreateWithoutQuestionInput;
};
export declare type AnswerUpdateManyWithoutQuestionInput = {
    create?: Enumerable<AnswerCreateWithoutQuestionInput>;
    connect?: Enumerable<AnswerWhereUniqueInput>;
    set?: Enumerable<AnswerWhereUniqueInput>;
    disconnect?: Enumerable<AnswerWhereUniqueInput>;
    delete?: Enumerable<AnswerWhereUniqueInput>;
    update?: Enumerable<AnswerUpdateWithWhereUniqueWithoutQuestionInput>;
    updateMany?: Enumerable<AnswerUpdateManyWithWhereNestedInput>;
    deleteMany?: Enumerable<AnswerScalarWhereInput>;
    upsert?: Enumerable<AnswerUpsertWithWhereUniqueWithoutQuestionInput>;
};
export declare type QuestionUpdateWithoutFormDataInput = {
    id?: number | null;
    uid?: string | null;
    type?: string | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    answers?: AnswerUpdateManyWithoutQuestionInput | null;
};
export declare type QuestionUpdateWithWhereUniqueWithoutFormInput = {
    where: QuestionWhereUniqueInput;
    data: QuestionUpdateWithoutFormDataInput;
};
export declare type QuestionScalarWhereInput = {
    id?: number | IntFilter | null;
    uid?: string | StringFilter | null;
    type?: string | StringFilter | null;
    text?: string | StringFilter | null;
    answers?: AnswerFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<QuestionScalarWhereInput>;
    OR?: Enumerable<QuestionScalarWhereInput>;
    NOT?: Enumerable<QuestionScalarWhereInput>;
};
export declare type QuestionUpdateManyDataInput = {
    id?: number | null;
    uid?: string | null;
    type?: string | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type QuestionUpdateManyWithWhereNestedInput = {
    where: QuestionScalarWhereInput;
    data: QuestionUpdateManyDataInput;
};
export declare type QuestionUpsertWithWhereUniqueWithoutFormInput = {
    where: QuestionWhereUniqueInput;
    update: QuestionUpdateWithoutFormDataInput;
    create: QuestionCreateWithoutFormInput;
};
export declare type QuestionUpdateManyWithoutFormInput = {
    create?: Enumerable<QuestionCreateWithoutFormInput>;
    connect?: Enumerable<QuestionWhereUniqueInput>;
    set?: Enumerable<QuestionWhereUniqueInput>;
    disconnect?: Enumerable<QuestionWhereUniqueInput>;
    delete?: Enumerable<QuestionWhereUniqueInput>;
    update?: Enumerable<QuestionUpdateWithWhereUniqueWithoutFormInput>;
    updateMany?: Enumerable<QuestionUpdateManyWithWhereNestedInput>;
    deleteMany?: Enumerable<QuestionScalarWhereInput>;
    upsert?: Enumerable<QuestionUpsertWithWhereUniqueWithoutFormInput>;
};
export declare type QuestionCreateWithoutAnswersInput = {
    uid: string;
    type: string;
    text: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    form?: FormCreateOneWithoutFormInput | null;
};
export declare type QuestionCreateOneWithoutQuestionInput = {
    create?: QuestionCreateWithoutAnswersInput | null;
    connect?: QuestionWhereUniqueInput | null;
};
export declare type AnswerCreateWithoutResponseInput = {
    text: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    question?: QuestionCreateOneWithoutQuestionInput | null;
};
export declare type FormCreateWithoutQuestionsInput = {
    uid: string;
    name: string;
    tag: string;
    responses?: ResponseCreateManyWithoutResponsesInput | null;
};
export declare type FormUpdateWithoutQuestionsDataInput = {
    id?: number | null;
    uid?: string | null;
    name?: string | null;
    tag?: string | null;
    responses?: ResponseUpdateManyWithoutFormInput | null;
};
export declare type FormUpsertWithoutQuestionsInput = {
    update: FormUpdateWithoutQuestionsDataInput;
    create: FormCreateWithoutQuestionsInput;
};
export declare type FormUpdateOneWithoutQuestionsInput = {
    create?: FormCreateWithoutQuestionsInput | null;
    connect?: FormWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: FormUpdateWithoutQuestionsDataInput | null;
    upsert?: FormUpsertWithoutQuestionsInput | null;
};
export declare type QuestionUpdateWithoutAnswersDataInput = {
    id?: number | null;
    uid?: string | null;
    type?: string | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    form?: FormUpdateOneWithoutQuestionsInput | null;
};
export declare type QuestionUpsertWithoutAnswersInput = {
    update: QuestionUpdateWithoutAnswersDataInput;
    create: QuestionCreateWithoutAnswersInput;
};
export declare type QuestionUpdateOneWithoutAnswersInput = {
    create?: QuestionCreateWithoutAnswersInput | null;
    connect?: QuestionWhereUniqueInput | null;
    disconnect?: boolean | null;
    delete?: boolean | null;
    update?: QuestionUpdateWithoutAnswersDataInput | null;
    upsert?: QuestionUpsertWithoutAnswersInput | null;
};
export declare type AnswerUpdateWithoutResponseDataInput = {
    id?: number | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    question?: QuestionUpdateOneWithoutAnswersInput | null;
};
export declare type AnswerUpdateWithWhereUniqueWithoutResponseInput = {
    where: AnswerWhereUniqueInput;
    data: AnswerUpdateWithoutResponseDataInput;
};
export declare type AnswerUpsertWithWhereUniqueWithoutResponseInput = {
    where: AnswerWhereUniqueInput;
    update: AnswerUpdateWithoutResponseDataInput;
    create: AnswerCreateWithoutResponseInput;
};
export declare type AnswerUpdateManyWithoutResponseInput = {
    create?: Enumerable<AnswerCreateWithoutResponseInput>;
    connect?: Enumerable<AnswerWhereUniqueInput>;
    set?: Enumerable<AnswerWhereUniqueInput>;
    disconnect?: Enumerable<AnswerWhereUniqueInput>;
    delete?: Enumerable<AnswerWhereUniqueInput>;
    update?: Enumerable<AnswerUpdateWithWhereUniqueWithoutResponseInput>;
    updateMany?: Enumerable<AnswerUpdateManyWithWhereNestedInput>;
    deleteMany?: Enumerable<AnswerScalarWhereInput>;
    upsert?: Enumerable<AnswerUpsertWithWhereUniqueWithoutResponseInput>;
};
export declare type ResponseUpdateWithoutFormDataInput = {
    id?: number | null;
    uid?: string | null;
    submittedAt?: string | Date | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    user?: UserUpdateOneWithoutResponsesInput | null;
    answers?: AnswerUpdateManyWithoutResponseInput | null;
};
export declare type ResponseUpdateWithWhereUniqueWithoutFormInput = {
    where: ResponseWhereUniqueInput;
    data: ResponseUpdateWithoutFormDataInput;
};
export declare type ResponseScalarWhereInput = {
    id?: number | IntFilter | null;
    uid?: string | StringFilter | null;
    submittedAt?: string | Date | DateTimeFilter | null;
    answers?: AnswerFilter | null;
    createdAt?: string | Date | DateTimeFilter | null;
    updatedAt?: string | Date | DateTimeFilter | null;
    AND?: Enumerable<ResponseScalarWhereInput>;
    OR?: Enumerable<ResponseScalarWhereInput>;
    NOT?: Enumerable<ResponseScalarWhereInput>;
};
export declare type ResponseUpdateManyDataInput = {
    id?: number | null;
    uid?: string | null;
    submittedAt?: string | Date | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type ResponseUpdateManyWithWhereNestedInput = {
    where: ResponseScalarWhereInput;
    data: ResponseUpdateManyDataInput;
};
export declare type ResponseUpsertWithWhereUniqueWithoutFormInput = {
    where: ResponseWhereUniqueInput;
    update: ResponseUpdateWithoutFormDataInput;
    create: ResponseCreateWithoutFormInput;
};
export declare type ResponseUpdateManyWithoutFormInput = {
    create?: Enumerable<ResponseCreateWithoutFormInput>;
    connect?: Enumerable<ResponseWhereUniqueInput>;
    set?: Enumerable<ResponseWhereUniqueInput>;
    disconnect?: Enumerable<ResponseWhereUniqueInput>;
    delete?: Enumerable<ResponseWhereUniqueInput>;
    update?: Enumerable<ResponseUpdateWithWhereUniqueWithoutFormInput>;
    updateMany?: Enumerable<ResponseUpdateManyWithWhereNestedInput>;
    deleteMany?: Enumerable<ResponseScalarWhereInput>;
    upsert?: Enumerable<ResponseUpsertWithWhereUniqueWithoutFormInput>;
};
export declare type FormUpdateInput = {
    id?: number | null;
    uid?: string | null;
    name?: string | null;
    tag?: string | null;
    questions?: QuestionUpdateManyWithoutFormInput | null;
    responses?: ResponseUpdateManyWithoutFormInput | null;
};
export declare type FormUpdateManyMutationInput = {
    id?: number | null;
    uid?: string | null;
    name?: string | null;
    tag?: string | null;
};
export declare type QuestionCreateInput = {
    uid: string;
    type: string;
    text: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    form?: FormCreateOneWithoutFormInput | null;
    answers?: AnswerCreateManyWithoutAnswersInput | null;
};
export declare type QuestionUpdateInput = {
    id?: number | null;
    uid?: string | null;
    type?: string | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    form?: FormUpdateOneWithoutQuestionsInput | null;
    answers?: AnswerUpdateManyWithoutQuestionInput | null;
};
export declare type QuestionUpdateManyMutationInput = {
    id?: number | null;
    uid?: string | null;
    type?: string | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type AnswerCreateInput = {
    text: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    question?: QuestionCreateOneWithoutQuestionInput | null;
    response?: ResponseCreateOneWithoutResponseInput | null;
};
export declare type AnswerUpdateInput = {
    id?: number | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    question?: QuestionUpdateOneWithoutAnswersInput | null;
    response?: ResponseUpdateOneWithoutAnswersInput | null;
};
export declare type AnswerUpdateManyMutationInput = {
    id?: number | null;
    text?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type ResponseCreateInput = {
    uid: string;
    submittedAt: string | Date;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    user?: UserCreateOneWithoutUserInput | null;
    form?: FormCreateOneWithoutFormInput | null;
    answers?: AnswerCreateManyWithoutAnswersInput | null;
};
export declare type ResponseUpdateInput = {
    id?: number | null;
    uid?: string | null;
    submittedAt?: string | Date | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    user?: UserUpdateOneWithoutResponsesInput | null;
    form?: FormUpdateOneWithoutResponsesInput | null;
    answers?: AnswerUpdateManyWithoutResponseInput | null;
};
export declare type ResponseUpdateManyMutationInput = {
    id?: number | null;
    uid?: string | null;
    submittedAt?: string | Date | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type UserCreateInput = {
    email: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    responses?: ResponseCreateManyWithoutResponsesInput | null;
    note?: NoteCreateOneWithoutNoteInput | null;
};
export declare type ResponseCreateWithoutUserInput = {
    uid: string;
    submittedAt: string | Date;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    form?: FormCreateOneWithoutFormInput | null;
    answers?: AnswerCreateManyWithoutAnswersInput | null;
};
export declare type ResponseUpdateWithoutUserDataInput = {
    id?: number | null;
    uid?: string | null;
    submittedAt?: string | Date | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    form?: FormUpdateOneWithoutResponsesInput | null;
    answers?: AnswerUpdateManyWithoutResponseInput | null;
};
export declare type ResponseUpdateWithWhereUniqueWithoutUserInput = {
    where: ResponseWhereUniqueInput;
    data: ResponseUpdateWithoutUserDataInput;
};
export declare type ResponseUpsertWithWhereUniqueWithoutUserInput = {
    where: ResponseWhereUniqueInput;
    update: ResponseUpdateWithoutUserDataInput;
    create: ResponseCreateWithoutUserInput;
};
export declare type ResponseUpdateManyWithoutUserInput = {
    create?: Enumerable<ResponseCreateWithoutUserInput>;
    connect?: Enumerable<ResponseWhereUniqueInput>;
    set?: Enumerable<ResponseWhereUniqueInput>;
    disconnect?: Enumerable<ResponseWhereUniqueInput>;
    delete?: Enumerable<ResponseWhereUniqueInput>;
    update?: Enumerable<ResponseUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Enumerable<ResponseUpdateManyWithWhereNestedInput>;
    deleteMany?: Enumerable<ResponseScalarWhereInput>;
    upsert?: Enumerable<ResponseUpsertWithWhereUniqueWithoutUserInput>;
};
export declare type UserUpdateInput = {
    id?: number | null;
    email?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    responses?: ResponseUpdateManyWithoutUserInput | null;
    note?: NoteUpdateOneWithoutUserInput | null;
};
export declare type UserUpdateManyMutationInput = {
    id?: number | null;
    email?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
};
export declare type NoteCreateInput = {
    text: string;
    user: UserCreateOneWithoutUserInput;
};
export declare type UserCreateWithoutNoteInput = {
    email: string;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    responses?: ResponseCreateManyWithoutResponsesInput | null;
};
export declare type UserUpdateWithoutNoteDataInput = {
    id?: number | null;
    email?: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
    responses?: ResponseUpdateManyWithoutUserInput | null;
};
export declare type UserUpsertWithoutNoteInput = {
    update: UserUpdateWithoutNoteDataInput;
    create: UserCreateWithoutNoteInput;
};
export declare type UserUpdateOneRequiredWithoutNoteInput = {
    create?: UserCreateWithoutNoteInput | null;
    connect?: UserWhereUniqueInput | null;
    update?: UserUpdateWithoutNoteDataInput | null;
    upsert?: UserUpsertWithoutNoteInput | null;
};
export declare type NoteUpdateInput = {
    id?: number | null;
    text?: string | null;
    user?: UserUpdateOneRequiredWithoutNoteInput | null;
};
export declare type NoteUpdateManyMutationInput = {
    id?: number | null;
    text?: string | null;
};
export declare type IntFilter = {
    equals?: number | null;
    not?: number | IntFilter | null;
    in?: Enumerable<number>;
    notIn?: Enumerable<number>;
    lt?: number | null;
    lte?: number | null;
    gt?: number | null;
    gte?: number | null;
};
export declare type StringFilter = {
    equals?: string | null;
    not?: string | StringFilter | null;
    in?: Enumerable<string>;
    notIn?: Enumerable<string>;
    lt?: string | null;
    lte?: string | null;
    gt?: string | null;
    gte?: string | null;
    contains?: string | null;
    startsWith?: string | null;
    endsWith?: string | null;
};
export declare type ResponseFilter = {
    every?: ResponseWhereInput | null;
    some?: ResponseWhereInput | null;
    none?: ResponseWhereInput | null;
};
export declare type DateTimeFilter = {
    equals?: string | Date | null;
    not?: string | Date | DateTimeFilter | null;
    in?: Enumerable<string | Date>;
    notIn?: Enumerable<string | Date>;
    lt?: string | Date | null;
    lte?: string | Date | null;
    gt?: string | Date | null;
    gte?: string | Date | null;
};
export declare type AnswerFilter = {
    every?: AnswerWhereInput | null;
    some?: AnswerWhereInput | null;
    none?: AnswerWhereInput | null;
};
export declare type QuestionFilter = {
    every?: QuestionWhereInput | null;
    some?: QuestionWhereInput | null;
    none?: QuestionWhereInput | null;
};
export declare type FormOrderByInput = {
    id?: OrderByArg | null;
    uid?: OrderByArg | null;
    name?: OrderByArg | null;
    tag?: OrderByArg | null;
};
export declare type QuestionOrderByInput = {
    id?: OrderByArg | null;
    uid?: OrderByArg | null;
    type?: OrderByArg | null;
    text?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
};
export declare type AnswerOrderByInput = {
    id?: OrderByArg | null;
    text?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
};
export declare type ResponseOrderByInput = {
    id?: OrderByArg | null;
    uid?: OrderByArg | null;
    submittedAt?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
};
export declare type UserOrderByInput = {
    id?: OrderByArg | null;
    email?: OrderByArg | null;
    createdAt?: OrderByArg | null;
    updatedAt?: OrderByArg | null;
};
export declare type NoteOrderByInput = {
    id?: OrderByArg | null;
    text?: OrderByArg | null;
};
/**
 * Batch Payload for updateMany & deleteMany
 */
export declare type BatchPayload = {
    count: number;
};
/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
