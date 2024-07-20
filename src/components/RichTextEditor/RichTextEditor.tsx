import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, DraftHandleValue, DraftEditorCommand, CompositeDecorator, ContentState, Entity, convertToRaw, AtomicBlockUtils, Modifier, SelectionState, convertFromHTML, convertFromRaw } from 'draft-js';
import { detectFileType, getYouTubeVideoId, getCaretPosition, getText, getCurrentBlock, getRandomKey, getFileName, isValidURL } from './utils';
import sendImage from '../../common/assets/Icons/svg/send.svg';
import './RichTextEditor.scss';


const Person = ({ person, selected, onClick, mentionRef }) => {
    const handleClick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        onClick(person);
        if (mentionRef.current) {
            mentionRef.current = null;
        }
    };

    return (
        <div className={`max-w-[200px] cursor-pointer p-2 ${selected ? 'bg-gray-300' : ''} flex justify-start items-center people`} onClick={handleClick}>
            <div style={{ width: '60px', padding: '2px' }} className='flex overflow-hidden justify-center items-center'>
                {person?.image ? <img src={person?.image} alt='' style={{ width: '30px', height: '30px', borderRadius: '9999px' }} /> : <div style={{ width: '30px', height: '30px', color: 'white', borderRadius: '9999px', backgroundColor: colors[(Math.floor(Math.random() * colors.length) || 0)] }} className='flex justify-center items-center text-center'>{person?.label?.length > 0 && person?.label[0]?.toUpperCase()}</div>}
            </div>
            <div style={{ width: '140px', textAlign: 'left' }} className='truncate'>{person?.label}</div>
        </div>
    );
};
const People = ({ top, left, people, selectedIndex, onClick, style, mentionRef }) => {
    return (
        <div className="bg-white border border-gray-100 flex flex-col justify-start text-center items-start gap-2 p-2 absolute w-[224px] z-50 max-h-[200px] overflow-y-auto overflow-x-hidden rounded shadow-md" style={{
            ...style,
        }} tabIndex={-1} ref={mentionRef}>
            {people.map((person, idx) => (
                <Person
                    key={person.id}
                    person={person}
                    selected={idx === selectedIndex}
                    onClick={onClick}
                    mentionRef={mentionRef}
                />
            ))}
        </div>
    );
}
const colors = [
    '#FF6347', // Tomato
    '#FF4500', // OrangeRed
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FF8C00', // DarkOrange
    '#FF69B4', // HotPink
    '#FF1493', // DeepPink
    '#FF00FF', // Magenta
    '#FF00FF', // Fuchsia
    '#DC143C', // Crimson
    '#DB7093', // PaleVioletRed
    '#DA70D6', // Orchid
    '#BA55D3', // MediumOrchid
    '#9370DB', // MediumPurple
    '#8A2BE2', // BlueViolet
    '#7B68EE', // MediumSlateBlue
    '#6A5ACD', // SlateBlue
    '#483D8B', // DarkSlateBlue
    '#4169E1', // RoyalBlue
    '#00BFFF', // DeepSkyBlue
    '#00CED1', // DarkTurquoise
    '#00FA9A', // MediumSpringGreen
    '#3CB371', // MediumSeaGreen
    '#2E8B57', // SeaGreen
    '#228B22', // ForestGreen
    '#20B2AA', // LightSeaGreen
    '#008080', // Teal
    '#008000', // Green
    '#32CD32', // LimeGreen
    '#ADFF2F', // GreenYellow
];

const cssStyles = `
  .RichEditor-root {
    background: #fff !important;
    border: 1px solid #ddd !important;
    font-family: 'Georgia', serif !important;
    font-size: 14px !important;
    padding: 15px !important;
  }

  .RichEditor-editor {
    border-top: 1px solid #ddd !important;
    cursor: text !important;
    font-size: 16px !important;
    margin-top: 10px !important;
  }

  .RichEditor-editor .public-DraftEditorPlaceholder-root,
  .RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px !important;
    padding: 15px !important;
  }

  .RichEditor-editor .public-DraftEditor-content {
    min-height: 100px !important;
  }

  .RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none !important;
  }

  .RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee !important;
    color: #666 !important;
    font-family: 'Hoefler Text', 'Georgia', serif !important;
    font-style: italic !important;
    margin: 16px 0 !important;
    padding: 10px 20px !important;
  }

  .RichEditor-editor .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05) !important;
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace !important;
    font-size: 16px !important;
    padding: 20px !important;
  }

  .RichEditor-controls {
    font-family: 'Helvetica', sans-serif !important;
    font-size: 14px !important;
    margin-bottom: 5px !important;
    user-select: none !important;
  }

  ::-webkit-scrollbar {
    width: 4px !important;
  }

  ::-webkit-scrollbar-thumb {
    background: #888 !important;
    border-radius: 10px !important;
  }

  ::-webkit-scrollbar {
    background: #f1f1f1 !important;
    border-radius: 10px !important;
    scrollbar-width: thin !important;
    scroll-behavior: smooth !important;
  }

  .DraftEditor-editorContainer,
  .DraftEditor-root,
  .public-DraftEditor-content {
    height: inherit !important;
    text-align: initial !important;
  }

  .public-DraftEditor-content[contenteditable=true] {
    -webkit-user-modify: read-write-plaintext-only !important;
  }

  .DraftEditor-root {
    position: relative !important;
  }

  .DraftEditor-editorContainer {
    background-color: rgba(255, 255, 255, 0) !important;
    border-left: 0.1px solid transparent !important;
    position: relative !important;
    z-index: 1 !important;
  }
   .people {
    background-color: white;
    transition: background-color 0.2s ease;
  }
  
  .people:hover {
    background-color: #d1d5db;
  }
  .public-DraftEditor-block {
    position: relative !important;
  }

  .DraftEditor-alignLeft .public-DraftStyleDefault-block {
    text-align: left !important;
  }

  .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {
    left: 0 !important;
    text-align: left !important;
  }

  .DraftEditor-alignCenter .public-DraftStyleDefault-block {
    text-align: center !important;
  }

  .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {
    margin: 0 auto !important;
    text-align: center !important;
    width: 100% !important;
  }

  .DraftEditor-alignRight .public-DraftStyleDefault-block {
    text-align: right !important;
  }

  .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {
    right: 0 !important;
    text-align: right !important;
  }

  .public-DraftEditorPlaceholder-root {
    color: #9197a3 !important;
    position: absolute !important;
    width: 100% !important;
    z-index: 1 !important;
  }

  .public-DraftEditorPlaceholder-hasFocus {
    color: #bdc1c9 !important;
  }

  .DraftEditorPlaceholder-hidden {
    display: none !important;
  }

  .public-DraftStyleDefault-block {
    position: relative !important;
    white-space: pre-wrap !important;
  }

  .public-DraftStyleDefault-ltr {
    direction: ltr !important;
    text-align: left !important;
  }

  .public-DraftStyleDefault-rtl {
    direction: rtl !important;
    text-align: right !important;
  }

  .public-DraftStyleDefault-listLTR {
    direction: ltr !important;
  }

  .public-DraftStyleDefault-listRTL {
    direction: rtl !important;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 1.5em !important;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL {
    margin-right: 1.5em !important;
  }

  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
    margin-left: 3em !important;
  }

  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL {
    margin-right: 3em !important;
  }

  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
    margin-left: 4.5em !important;
  }

  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL {
    margin-right: 4.5em !important;
  }

  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
    margin-left: 6em !important;
  }

  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL {
    margin-right: 6em !important;
  }

  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
    margin-left: 7.5em !important;
  }

  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL {
    margin-right: 7.5em !important;
  }

  .public-DraftStyleDefault-unorderedListItem {
    list-style-type: square !important;
    position: relative !important;
  }

  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0 {
    list-style-type: disc !important;
  }

  .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1 {
    list-style-type: circle !important;
  }

  .public-DraftStyleDefault-orderedListItem {
    list-style-type: none !important;
    position: relative !important;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
    left: -36px !important;
    position: absolute !important;
    text-align: right !important;
    width: 30px !important;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before {
    position: absolute !important;
    right: -36px !important;
    text-align: left !important;
    width: 30px !important;
  }

  .public-DraftStyleDefault-orderedListItem:before {
    content: counter(ol0) ". " !important;
    counter-increment: ol0 !important;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before {
    content: counter(ol1, lower-alpha) ". " !important;
    counter-increment: ol1 !important;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before {
    content: counter(ol2, lower-roman) ". " !important;
    counter-increment: ol2 !important;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before {
    content: counter(ol3) ". " !important;
    counter-increment: ol3 !important;
  }

  .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before {
    content: counter(ol4, lower-alpha) ". " !important;
    counter-increment: ol4 !important;
  }

  .public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset {
    counter-reset: ol0 !important;
  }

  .public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset {
    counter-reset: ol1 !important;
  }

  .public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset {
    counter-reset: ol2 !important;
  }

  .public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset {
    counter-reset: ol3 !important;
  }

  .public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset {
    counter-reset: ol4 !important;
  }

  ul {
    display: block !important;
    list-style-type: disc !important;
    margin-block-start: 1em !important;
    margin-block-end: 1em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    padding-inline-start: 40px !important;
    unicode-bidi: isolate !important;
    padding: 10px !important;
    border-radius: 5px !important;
    margin: 16px 0 !important;
  }

  ol {
    display: block !important;
    list-style-type: decimal !important;
    margin-block-start: 1em !important;
    margin-block-end: 1em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    padding-inline-start: 40px !important;
    unicode-bidi: isolate !important;
    padding: 10px !important;
    border-radius: 5px !important;
    margin: 16px 0 !important;
  }

  h1 {
    display: block !important;
    font-size: 2em !important;
    margin-block-start: 0.67em !important;
    margin-block-end: 0.67em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
    unicode-bidi: isolate !important;
  }

  h2 {
    display: block !important;
    font-size: 1.5em !important;
    margin-block-start: 0.83em !important;
    margin-block-end: 0.83em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
    unicode-bidi: isolate !important;
  }

  h3 {
    display: block !important;
    font-size: 1.17em !important;
    margin-block-start: 1em !important;
    margin-block-end: 1em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
    unicode-bidi: isolate !important;
  }

  h4 {
    display: block !important;
    margin-block-start: 1.33em !important;
    margin-block-end: 1.33em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
    unicode-bidi: isolate !important;
  }

  h5 {
    display: block !important;
    font-size: 0.83em !important;
    margin-block-start: 1.67em !important;
    margin-block-end: 1.67em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
    unicode-bidi: isolate !important;
  }

  h6 {
    display: block !important;
    font-size: 0.67em !important;
    margin-block-start: 2.33em !important;
    margin-block-end: 2.33em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    font-weight: bold !important;
    unicode-bidi: isolate !important;
  }
`;

const RichTextEditor: React.FC = (props: any) => {
    const { rawJson, mentionmembers, dropDownAPI, OnSubmit, getUrlforMedia, style } = props;

    const findLinkEntities = (contentBlock: any, callback: any, contentState: ContentState) => {
        contentBlock.findEntityRanges(
            (character: any) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null &&
                    contentState.getEntity(entityKey).getType() === 'LINK'
                );
            },
            callback
        );
    };

    const Link: React.FC<any> = (props) => {
        const { url } = props.contentState?.getEntity(props?.entityKey)?.getData();
        return (
            <a
                href={url}
                style={{ color: 'blue', textDecoration: 'underline', cursor: "pointer" }}
                onClick={(e) => {
                    e.preventDefault();
                    window.open(url, '_blank', 'noopener,noreferrer');
                }}
                target='_blank'
            >
                {props.children}
            </a>
        );
    };

    const newEntityLocationStrategy = type => {
        const findEntitiesOfType = (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges(
                character => {
                    const entityKey = character.getEntity();
                    return (
                        entityKey !== null &&
                        contentState.getEntity(entityKey).getType() === type
                    );
                },
                callback
            );
        };
        return findEntitiesOfType;
    };


    const Mention = ({ children, contentState, entityKey }) =>
        <span className="" style={{
            backgroundColor: '#e6f3ff',
            color: '#0077cc',
            padding: '2px 4px',
            borderRadius: '4px',
            cursor: 'pointer',
        }} title={contentState.getEntity(entityKey)?.getData()?.id} > {children}</span >

    const decorator = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link,
        },
        {
            strategy: newEntityLocationStrategy('MENTION'),
            component: Mention
        }
    ]);

    const [editorState, setEditorState] = useState<any>(EditorState.createEmpty(decorator));
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [selectedTextType, setSelectedTextType] = useState<any>('Normal');
    const editorRef = useRef<Editor | null>(null);
    const [activeAction, setActiveAction] = useState<any>({});
    const [showURLInput, setShowURLInput] = React.useState(false);
    const [showMediaURLInput, setShowMediaURLInput] = React.useState(false);
    const [urlValue, setUrlValue] = React.useState('');
    const [urlType, setUrlType] = React.useState('')
    const hTextModal = useRef<any>(null);
    const urlRef = useRef<URL | any>(null);
    const fileInputRef = useRef(null);
    const mentionRef = useRef(null);
    const [mention, setMention] = useState(null);
    const [mentionData, setMentionData] = useState(new Set())
    const [people, setPeople] = useState([]);
    const [noteId] = useState(getRandomKey());
    const prevMenText = useRef(null);
    // useCloseModal( hTextModal, () => setActiveAction({}));

    const focus = useCallback(() => {
        setActiveAction({})
        setShowMediaURLInput(false);
        setShowURLInput(false);
        if (editorRef.current) {
            editorRef.current.focus();
        }
        if (mentionRef.current) {
            mentionRef.current = null;
            setMention(null);
        }
    }, []);
    useEffect(() => {
        if (rawJson && Object.keys(rawJson).length > 0) {
            const contentState = convertFromRaw(rawJson);
            setEditorState(EditorState.createWithContent(contentState, decorator));
        }
        if (mentionmembers?.length > 0) {
            const NoteMentionData = new Set(mentionmembers.map(obj => JSON.stringify(obj)));
            setMentionData(NoteMentionData);
        }

    }, []);


    const onChange = async (editorState: EditorState) => {
        if (mention && mentionRef?.current?.length !== mention?.people?.length) {
            const caret = getCaretPosition(editorState)
            if (caret > mention?.offset) {
                const mentionText = getText(editorState, mention.offset + 1, caret).toLowerCase();
                if (prevMenText.current && prevMenText.current === mentionText) {
                    mentionRef.current.focus();
                    prevMenText.current = null;
                } else {
                    prevMenText.current = mentionText;
                    const candidates = await dropDownAPI(mentionText);
                    const coordinates = getMentionPosition();
                    setMention({
                        ...mention,
                        selectedIndex: 0,
                        people: candidates,
                        position: coordinates
                    })
                    setEditorState(editorState);

                }
                // mentionRef.current.focus();
            } else {
                // last change deleted the @ character, so exit mention mode
                setEditorState(editorState);
                setMention(undefined);
            }
        } else {
            setEditorState(editorState);
        }
    };

    const handleBeforeInput = (ch, editorState): any => {
        if (!mention && ch === '@') {
            // set api call to set people setPeople
            setMention({
                people: [],
                selectedIndex: 0,
                offset: getCaretPosition(editorState),
                position: getMentionPosition()
            })
        }
        return false; // returning false to handle draft-js after handling mention from our side
    }

    const acceptSelectedPerson = (ev) => {
        if (mention) {
            if (mention.people && mention.people?.length > mention?.selectedIndex) {
                let person = mention?.people[mention?.selectedIndex]
                confirmMention(person)
            } else {
                setMention(undefined)
            }
            ev.preventDefault()
            return true
        }
        return false
    }
    // const handleUpArrow = (ev) => {
    //     if (mention) {
    //         setMention({
    //             ...mention,
    //             selectedIndex: Math.max(0, mention?.selectedIndex - 1)
    //         })

    //         ev.preventDefault()
    //     }
    // }
    // const handleDownArrow = (ev) => {
    //     if (mention) {
    //         setMention({
    //             ...mention,
    //             selectedIndex: Math.min(mention.selectedIndex + 1, people.length - 1)
    //         })
    //         ev.preventDefault()
    //     }
    // }
    const confirmMention = (person) => {
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity(
            'MENTION',
            'IMMUTABLE',
            person
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const block = getCurrentBlock(editorState)
        const blockKey = block.getKey()
        const mentionText = '@' + person.label
        const contentStateWithReplacedText = Modifier.replaceText(
            contentStateWithEntity,
            new SelectionState({
                anchorKey: blockKey,
                anchorOffset: mention.offset,
                focusKey: blockKey,
                focusOffset: getCaretPosition(editorState),
                isBackward: false,
                hasFocus: true
            }),
            mentionText,
            null,
            entityKey
        )
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithReplacedText,
            selection: new SelectionState({
                anchorKey: blockKey,
                anchorOffset: mention.offset + mentionText.length,
                focusKey: blockKey,
                focusOffset: mention.offset + mentionText.length,
                isBackward: false,
                hasFocus: true
            })
        })
        if (!mentionData.has(person)) {
            setMentionData((prev) => {
                const newSet = new Set(prev);
                newSet.add(person);
                return newSet;
            });
        }
        setTimeout(() => {
            setEditorState(newEditorState);
            setMention(undefined);
            mentionRef.current = null;
        }, 0)
    }

    const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>): DraftEditorCommand | null | string => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
            if (newEditorState !== editorState) {
                setEditorState(newEditorState);
            }
            return null;
        }
        return getDefaultKeyBinding(e);
    };

    const toggleBlockType = (blockType: any) => {
        const newState = RichUtils.toggleBlockType(editorState, blockType);
        onChange(newState);
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    /// for link
    const promptForLink = (e) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = selection?.getStartKey();
            const startOffset = selection?.getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(
                startKey
            );
            const blockType = blockWithLinkAtBeginning.getType();
            if (blockType === 'atomic') {
                const entityKey = blockWithLinkAtBeginning.getEntityAt(0);
                let url = '';
                if (entityKey) {
                    const entity = contentState.getEntity(entityKey);
                    if (entity.getType() === 'IMAGE') {
                        url = entity.getData()?.src;
                    }
                }
                setUrlValue(url);
            } else {
                const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
                let url = '';
                if (linkKey) {
                    const linkInstance = contentState?.getEntity(linkKey);
                    url = linkInstance.getData()?.url;
                }
                setUrlValue(url);
            }

            setShowURLInput(!showURLInput);
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.focus();
                }
            }, 0);
        }
    };
    //for media
    const promptForMedia = (type) => {
        setShowMediaURLInput(!showMediaURLInput);
        const url_type = detectFileType(urlValue)
        setUrlValue('');
        setUrlType(url_type);
        if (showMediaURLInput) {
            setTimeout(() => urlRef.current?.focus(), 0);
        }
    };
    const confirmLink = (e) => {
        e.preventDefault();
        if (!isValidURL(urlValue)) {
            setShowURLInput(false);
            setUrlValue('');
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.focus();
                }
            }, 0);
            return;
        }
        try {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: urlValue }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity,
            });
            const selectionState = editorState?.getSelection();
            const newState = RichUtils?.toggleLink(
                newEditorState,
                selectionState,
                entityKey
            );
            if (newState) {
                setEditorState(newState);
            }
        } catch (e) {
            console.error("selection state not correct")
        }

        setShowURLInput(false);
        setUrlValue('');
        setTimeout(() => {
            if (editorRef.current) {
                editorRef.current.focus();
            }
        }, 0);
    };
    const confirmMedia = async (e) => {
        e.preventDefault();
        const file = fileInputRef?.current?.files[0];
        let src;
        let checktype;
        console.log(file, "file")
        let fileName = '';
        if (file) {
            src = await getUrlforMedia(file);
            // src = URL.createObjectURL(file);  // replace with api to get url for media getUrlforMedia
            checktype = detectFileType(file);
            fileName = getFileName(file);
        } else {
            src = urlValue;
            checktype = detectFileType(src);
        }
        const contentState = editorState.getCurrentContent();

        console.log(urlType, checktype, src, "urlType", contentState);
        if (checktype !== 'Unknown') {
            const contentStateWithEntity = contentState.createEntity(
                checktype,
                'IMMUTABLE',
                { src, fileName }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            if (contentStateWithEntity) {
                const newEditorState = EditorState.set(
                    editorState,
                    { currentContent: contentStateWithEntity }
                );

                setEditorState(
                    AtomicBlockUtils.insertAtomicBlock(
                        newEditorState,
                        entityKey,
                        ' '
                    )
                );
            }
        }
        setShowMediaURLInput(false);
        setUrlValue('');
        setUrlType('');
        fileInputRef.current = null;
        setTimeout(() => focus(), 0);
    };
    const removeLink = (e) => {
        e.preventDefault();
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setEditorState(
                RichUtils.toggleLink(editorState, selection, null)
            );
            setShowURLInput(false);
            setUrlValue('');
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.focus();
                }
            }, 0);
        }
    };
    const onURLChange = (e) => {
        setUrlValue(e.target.value);
        if (urlRef && urlRef.current) {
            setTimeout(() => urlRef.current?.focus(), 0);
        }
    };
    const onLinkInputKeyDown = (e) => {
        if (e.which === 13) {
            confirmLink(e);
        }
    };


    const styleMap = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
        HIGHLIGHT: {
            backgroundColor: 'yellow',
        },
    };

    const getBlockStyle = (block: any) => {
        const x = block.getType();
        switch (block.getType()) {
            case 'blockquote': return 'border-l-4 border-gray-200 text-gray-600 font-serif italic my-4 py-2 px-5';
            case 'code-block': return 'bg-gray-100 border-l-4 border-gray-300 font-mono text-sm p-2 my-4 overflow-x-auto whitespace-pre-wrap';
            default: return null;
        }
    };

    const StyleButton: React.FC<any> = ({ onToggle, style, active, label }) => {
        const blockExists: Boolean = ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(label);
        const styleExists: Boolean = ['Bold'].includes(label);
        const handleMouseDown = (e: React.MouseEvent) => {
            e.preventDefault();
            setActiveAction({})
            if (label === 'Link') {
                promptForLink(e);
            } else if (label === 'Image') {
                promptForMedia('image');
            } else {
                onToggle(style);
                if (blockExists) {
                    setSelectedTextType(label);
                }
            }
        };

        let className_ = 'text-gray-500 cursor-pointer py-0.5 inline-block';
        let displayLabel;
        let extraClass = '';

        switch (label) {
            case 'Bold':
                displayLabel = 'B';
                extraClass = 'font-bold';
                break;
            case 'Italic':
                displayLabel = 'I';
                extraClass = 'italic';
                break;
            case 'Underline':
                displayLabel = 'U';
                extraClass = 'underline';
                break;
            case 'Monospace':
                displayLabel = 'M';
                extraClass = 'font-mono';
                break;
            case 'Blockquote':
                displayLabel = `&rdquo;`;
                extraClass = 'font-bold';
                break;
            case 'UL':
                displayLabel = '<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M6 8c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 5c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 5c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2z" fill="currentColor" fill-rule="evenodd"></path></svg>';
                extraClass = 'font-bold';
                break;
            case 'OL':
                displayLabel = '<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M11 7h6a1 1 0 010 2h-6a1 1 0 010-2zm0 4h6a1 1 0 010 2h-6a1 1 0 010-2zm0 4h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 0h3v1H6v-1zm0 2h3v1H6v-1zm1-9H6V7h2v3H7V8zm-1 3h3v1.333h-.6V13H7.2v-.667H6V11zm0 2h3v1H6v-1zm2 3h2v1H8v-1z" fill="currentColor" fill-rule="evenodd"></path></svg>';
                extraClass = 'font-bold';
                break;
            case 'Code Block':
                displayLabel = '<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M10.208 7.308a1.09 1.09 0 010 1.483l-3.515 3.71 3.515 3.708a1.09 1.09 0 010 1.483.957.957 0 01-1.405 0l-3.866-4.08a1.635 1.635 0 010-2.225l3.866-4.08a.957.957 0 011.405 0zm3.584 0a.957.957 0 011.405 0l3.866 4.08c.583.614.583 1.61 0 2.225l-3.866 4.08a.957.957 0 01-1.405 0 1.09 1.09 0 010-1.484l3.515-3.708-3.515-3.71a1.09 1.09 0 010-1.483z" fill="currentColor" fill-rule="evenodd"></path></svg>';
                extraClass = 'font-bold';
                break;
            case 'Link':
                displayLabel = '<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M12.654 8.764a.858.858 0 01-1.213-1.213l1.214-1.214a3.717 3.717 0 015.257 0 3.714 3.714 0 01.001 5.258l-1.214 1.214-.804.804a3.72 3.72 0 01-5.263.005.858.858 0 011.214-1.214c.781.782 2.05.78 2.836-.005l.804-.803 1.214-1.214a1.998 1.998 0 00-.001-2.831 2 2 0 00-2.83 0l-1.215 1.213zm-.808 6.472a.858.858 0 011.213 1.213l-1.214 1.214a3.717 3.717 0 01-5.257 0 3.714 3.714 0 01-.001-5.258l1.214-1.214.804-.804a3.72 3.72 0 015.263-.005.858.858 0 01-1.214 1.214 2.005 2.005 0 00-2.836.005l-.804.803L7.8 13.618a1.998 1.998 0 00.001 2.831 2 2 0 002.83 0l1.215-1.213z" fill="currentColor"></path></svg>';
                extraClass = 'font-bold';
                break;
            case 'Image':
                displayLabel = '<svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M11 15l-1-1-2 2h8v-1.8L14 12l-3 3zM6 6.5c0-.276.229-.5.5-.5h11c.276 0 .5.229.5.5v11c0 .276-.229.5-.5.5h-11a.504.504 0 01-.5-.5v-11zM9.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" fill-rule="evenodd"></path></svg>';
                extraClass = 'font-bold';
                // displayLabel = '<svg width="23" height="23" viewBox="0 0 24 24" role="presentation"><path d="M12.2 6h7.81C21.108 6 22 6.893 22 7.992v11.016c0 1.1-.898 1.992-1.99 1.992H3.99A1.992 1.992 0 012 19.008V5.006C2 3.898 2.896 3 3.997 3h5.006c1.103 0 2.327.826 2.742 1.862L12.2 6z" fill="currentColor" fill-rule="evenodd"></path></svg>'
                break;
            default:
                displayLabel = label;
                extraClass = '';
        }
        return (

            <span className={`bg-white hover:bg-gray-200 p-1 text-center rounded-sm cursor-pointer ${className_} extra-style ${extraClass}`} style={{
                minWidth: '20px',
                color: active ? '#5890ff' : undefined,
            }} onMouseDown={handleMouseDown}>
                <span dangerouslySetInnerHTML={{ __html: displayLabel }} />

            </span>
        )


    };
    const getMentionPosition = () => {
        const selection = window?.getSelection();
        let range = null;

        if (selection && selection.rangeCount > 0) {
            range = selection?.getRangeAt(0)?.cloneRange();
        } else {
            console.warn('No valid selection found');
        }

        const rect = range?.getBoundingClientRect();
        if (!rect) {
            setMention(undefined)
        }
        const ele = document.getElementById(`my-rich-text-editor-${noteId}`);
        const editorCoordinates = ele.getBoundingClientRect();
        const totalWidth = window?.innerWidth;
        const totalHeight = window?.innerHeight;
        const editorLeft = editorCoordinates?.left;
        const editorTop = editorCoordinates?.top;
        let leftPosition = rect?.left - editorLeft;
        let topPosition = rect?.bottom - editorTop;
        if (rect?.left >= editorLeft && rect?.top >= editorTop && rect?.top <= editorCoordinates?.bottom && rect?.right <= editorCoordinates?.right) {
            if (totalWidth - rect?.left < 180) {
                leftPosition = leftPosition - 180;
            }
            if (totalHeight - rect?.bottom < 100) {
                topPosition = topPosition - 215;
            }
            return { top: topPosition, left: leftPosition }
        } else {
            return { top: mention?.position?.top, left: mention?.position?.left }
        }

    };
    const handleOnSubmit = async (e: any) => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const element = document.getElementById(`my-rich-text-editor-${noteId}`);
        let sendMentions = [];
        mentionData.forEach((item) => {
            sendMentions.push(item);
        });
        let noteText = '';
        rawContentState?.blocks?.forEach(block => {
            noteText += block?.text + ' ';
        });
        if(noteText !== ' '){
            console.log({ html: element?.innerHTML, rawJson: rawContentState, mentions: sendMentions, text: noteText }, "onsubmit");
            await OnSubmit({ html: element?.innerHTML, rawJson: rawContentState, mentions: sendMentions, text: noteText });
            setEditorState(EditorState.createEmpty(decorator));
            setSelectedTextType('Normal');
            // editorRef.current = null;
        }
    }

    const BlockStyleControls: React.FC<any> = ({ editorState, onToggle }) => {
        const selection = editorState?.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection?.getStartKey())
            .getType();
        const currentStyle = editorState?.getCurrentInlineStyle();

        // console.log(blockType, "blockType")
        // console.log(currentStyle, "currentStyle")

        return (
            <div className="flex p-2 justify-center items-center" onMouseEnter={(e) => {               
                editorRef?.current?.blur();
            }} onClick={() => {
                if (activeAction['toggle-textType']) setActiveAction({})
            }
            } >
                <div className='w-[96%] flex flex-wrap gap-3 justify-start items-center' onMouseEnter={(e) => {        
                    editorRef?.current?.blur();
                }} onClick={() => {
                    if (activeAction['toggle-textType']) setActiveAction({})
                }
                } >
                    <div className='flex flex-col cursor-pointer relative'>
                        <div className='p-2 text-gray-500 cursor-pointer inline-block shadow-sm rounded-sm text-center py-1' style={{ width: '100px' }} onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setActiveAction({ 'toggle-textType': !activeAction['toggle-textType'] })
                        }}>
                            {selectedTextType}
                        </div>
                        {Boolean(anchorEl) && activeAction['toggle-textType'] &&
                            <div className='absolute flex flex-col items-center gap-2 p-2 bg-white rounded shadow z-50' style={{
                                width: anchorEl ? anchorEl.clientWidth : undefined,
                                top: "100%"
                            }}>
                                <StyleButton key={'normal-text'} active={'unstyled' === blockType} label={'Normal'} onToggle={toggleBlockType} style={'unstyled'} />
                                <StyleButton key={'H1'} active={'header-one' === blockType} label={'H1'} onToggle={toggleBlockType} style={'header-one'} />
                                <StyleButton key={'H2'} active={'header-two' === blockType} label={'H2'} onToggle={toggleBlockType} style={'header-two'} />
                                <StyleButton key={'H3'} active={'header-three' === blockType} label={'H3'} onToggle={toggleBlockType} style={'header-three'} />
                                <StyleButton key={'H4'} active={'header-four' === blockType} label={'H4'} onToggle={toggleBlockType} style={'header-four'} />
                                <StyleButton key={'H5'} active={'header-five' === blockType} label={'H5'} onToggle={toggleBlockType} style={'header-five'} />
                                <StyleButton key={'H6'} active={'header-six' === blockType} label={'H6'} onToggle={toggleBlockType} style={'header-six'} />

                            </div>
                        }
                    </div>

                    <StyleButton key={'Bold'} active={currentStyle?.has('BOLD')} label={'Bold'} onToggle={toggleInlineStyle} style={'BOLD'} />
                    <StyleButton key={'Italic'} active={currentStyle?.has('ITALIC')} label={'Italic'} onToggle={toggleInlineStyle} style={'ITALIC'} />
                    <StyleButton key={'Underline'} active={currentStyle?.has('UNDERLINE')} label={'Underline'} onToggle={toggleInlineStyle} style={'UNDERLINE'} />
                    <StyleButton key={'Monospace'} active={currentStyle?.has('CODE')} label={'Monospace'} onToggle={toggleInlineStyle} style={'CODE'} />

                    <StyleButton key={'Blockquote'} active={'blockquote' === blockType} label={'Blockquote'} onToggle={toggleBlockType} style={'blockquote'} />
                    <StyleButton key={'UL'} active={'unordered-list-item' === blockType} label={'UL'} onToggle={toggleBlockType} style={'unordered-list-item'} />
                    <StyleButton key={'OL'} active={'ordered-list-item' === blockType} label={'OL'} onToggle={toggleBlockType} style={'ordered-list-item'} />
                    <StyleButton key={'Code Block'} active={'code-block' === blockType} label={'Code Block'} onToggle={toggleBlockType} style={'code-block'} />
                    <div className='h-[32px] relative'>
                        <StyleButton key={'Link'} active={showURLInput} label={'Link'} style={'link'} />
                        {showURLInput && (
                            <div className='absolute z-50 border bg-white border-gray-100 rounded-md p-2 flex flex-col gap-5 justify-center shadow-md items-center mr-2' style={{ marginBottom: 10, width: '20rem', marginLeft: '-9rem', top: "100%" }}>
                                <input
                                    className='border border-gray-200 rounded focus:outline-none'
                                    onChange={onURLChange}
                                    ref={(input) => {
                                        if (input) input.focus();
                                    }}
                                    style={{
                                        fontFamily: "'Georgia', serif",
                                        padding: 6,
                                        width: '100%',
                                    }}
                                    type="text"
                                    value={urlValue}
                                    onKeyDown={onLinkInputKeyDown}
                                    placeholder='URL'
                                />
                                <div className='flex justify-end gap-3 p-1 w-full'>
                                    <div className='border border-gray-200 shadow-sm cursor-pointer text-center p-1 text-sm' onMouseDown={removeLink}>Remove</div>
                                    <div className='border border-gray-200 shadow-sm cursor-pointer text-center p-1 text-sm' onMouseDown={confirmLink}>Add</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='h-[32px] relative'>
                        <StyleButton key={'Image'} active={showMediaURLInput} label={'Image'} style={'image'} />
                        {showMediaURLInput && (
                            <div className='absolute z-50 border bg-white border-gray-100 rounded-md p-2 flex flex-col gap-5 justify-center shadow-md items-center mr-2' style={{ marginBottom: 10, width: '20rem', marginLeft: '-9rem', top: "100%" }}>
                                <input
                                    className='border border-gray-200 rounded focus:outline-none'
                                    onChange={onURLChange}
                                    ref={urlRef}
                                    style={{
                                        fontFamily: "'Georgia', serif",
                                        padding: 6,
                                        width: '100%',
                                    }}
                                    type="text"
                                    value={urlValue}
                                    onKeyDown={(e) => {
                                        if (e.which === 13) {
                                            confirmMedia(e);
                                        }
                                    }}
                                    placeholder='Media URL'
                                />
                                <div className='flex justify-end gap-3 p-1 w-full'>
                                    <div className='border border-gray-200 shadow-sm cursor-pointer text-center p-1 text-sm' onClick={() => {
                                        fileInputRef.current?.click();
                                    }}>
                                        Browse
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={confirmMedia}
                                    />
                                    <div className='border border-gray-200 shadow-sm cursor-pointer text-center p-1 text-sm' onMouseDown={confirmMedia}>Confirm</div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>


                <div className='flex justify-end items-center cursor-pointer p-1' onMouseEnter={(e) => {
                    // e.preventDefault();
                    editorRef?.current?.blur();
                }} onClick={(e) => {
                    handleOnSubmit(e);
                }}>
                    <img src={sendImage} alt='send' className='w-[22px] h-[22px]' />
                </div>
            </div>
        );
    };
    const Audio = (props) => {
        return <audio controls src={props?.src} style={{
            width: '100%',
            whiteSpace: 'initial'
        }} />;
    };

    const Image = (props) => {
        return <img src={props?.src} style={{
            maxWidth: '100%',
            maxHeight: '1000px',
            whiteSpace: 'initial'
        }} />;
    };

    const Video = (props) => {
        return <video controls src={props?.src} style={{
            maxWidth: '100%',
            maxHeight: '1000px',
            whiteSpace: 'initial',
            cursor: 'pointer'
        }} />;
    };
    const DOCPreview = (props) => {
        return (
            <a href={props?.src} download style={{ textDecoration: 'none' }}>
                <div className='w-full border border-gray-300 bg-gray-100 p-2 rounded cursor-pointer truncate'>
                    <p>{props?.fileName}</p>
                </div>
            </a>
        );
    };
    const PDFPreview = (props) => {
        console.log(props, "pdf")
        return (
            <a href={props?.src} download style={{ textDecoration: 'none' }}>
                <div className='w-full border border-gray-300 bg-gray-100 p-2 rounded cursor-pointer truncate'>
                    <p>{props?.fileName}</p>
                </div>
            </a>
        );
    };
    const TextFilePreview = (props) => {
        return (
            <a href={props?.src} download style={{ textDecoration: 'none' }}>
                <div className='w-full border border-gray-300 bg-gray-100 p-2 rounded cursor-pointer truncate'>
                    <p>{props?.fileName}</p>
                </div>
            </a>
        );
    };


    const Media = (props) => {
        const entityAtBegin = props?.block?.getEntityAt(0);
        const entity = props?.contentState?.getEntity(
            entityAtBegin
        );
        const { src, fileName } = entity?.getData();
        const type = entity?.getType();
        const YouTube = useCallback((props) => {
            const videoId = getYouTubeVideoId(props?.src);
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return (
                <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden', maxWidth: '100%', height: '300px', background: '#000', cursor: 'pointer' }}>
                    <iframe
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </div>
            );
        }, []);

        let media;
        if (type === 'audio') {
            media = <Audio src={src} />;
        } else if (type === 'image') {
            media = <Image src={src} />;
        } else if (type === 'video') {
            console.log("inside media src", src)
            if (src.includes('https://you')) {
                media = <YouTube src={src} />;
            } else {
                media = <Video src={src} />;
            }
        } else if (type === 'pdf') {
            media = <PDFPreview src={src} fileName={fileName} />;
        } else if (type === 'doc') {
            media = <DOCPreview src={src} fileName={fileName} />;
        } else if (type === 'text') {
            media = <TextFilePreview src={src} fileName={fileName} />;
        }

        return media;
    };


    const customBlockRendererFn = useCallback((contentBlock) => {
        const type = contentBlock.getType();
        if (type === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }
        return null;
    }, []);

    return (
        // <div className='flex justify-center items-center' style={{ marginTop: '2rem' }}>
        <div className="border border-gray-200 rounded shadow-sm p-2" style={{ width: '100%' }}>
            <style>{cssStyles}</style>
            <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
            <div className={`border border-gray-200 rounded p-2 relative`} style={{ minHeight: style?.height ? style.height : '150px' }} id={`my-rich-text-editor-${noteId}`} onClick={focus}>
                {mention && mention?.people?.length > 0 ?
                    <People
                        {...(mention?.position)}
                        people={mention?.people}
                        selectedIndex={mention?.selectedIndex}
                        onClick={confirmMention}
                        style={{ position: 'absolute', top: mention?.position?.top, left: mention?.position?.left }}
                        mentionRef={mentionRef}
                    />
                    :
                    null
                }
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    ref={editorRef}
                    spellCheck={true}
                    blockRendererFn={customBlockRendererFn}
                    handleBeforeInput={handleBeforeInput}
                    onTab={(e) => {
                        acceptSelectedPerson(e);
                    }}
                    // onUpArrow={handleUpArrow}
                    // onDownArrow={handleDownArrow}
                    readOnly={false}
                    textAlignment="left"
                    tabIndex={0}
                    stripPastedStyles={false}
                    editorKey="myEditor"
                    webDriverTestID="editor"
                />

            </div>
        </div>
        // </div>
    );
};

export default React.memo(RichTextEditor);
