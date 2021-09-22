/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
    node, // the node that was just created
    actions: { createNode, createParentChildLink},
    createNodeId,
    createContentDigest,
    getCache,
}) => {
        console.log("node", node);

    if(node?.internal?.type === "ShopifyProductMetafield"){
        // console.log("node", node);
        if(node?.namespace === "custom_fields" && node?.valueType === "string"){
            const value = node?.value;
            if(value && value !== null && /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(value)){

                if(value.includes("<img")){
                    const imgUrl = value.split('"')[1];
                    const altText = value.split('"')[3] || null;
                    const fileNode = await createRemoteFileNode({
                        url: imgUrl,
                        parentNodeId: node.id,
                        createNode,
                        createNodeId,
                        getCache,
                    })
        
                    let images= [];

                    if (fileNode) {
                        images.push({
                            alt: altText,
                            originalSrc: imgUrl,
                            localFile___NODE : fileNode.id
                        })
                    }
    
                    const content = {
                        key: node.key,
                        value: node.value,
                        valueType: node.valueType,
                        namespace: node.namespace,
                        images,
                        type: node.type
                    }
                    const childNode = createNode({
                        id: createNodeId(`my-data-${node.id}`),
                        ...content,
                        parent: null,
                        children: [],
                        internal: {
                          type: `BonifyMetafield`,
                          content: JSON.stringify(content),
                          contentDigest: createContentDigest(content),
                        },
                    });
    
                    createParentChildLink({ parent: node, child: childNode })

    
                    node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
    
                }
                else {

                    if(value && value !== null){
                        fileNode = await createRemoteFileNode({
                            url: value,
                            parentNodeId: node.id,
                            createNode,
                            createNodeId,
                            getCache,
                        })

                        let images= [];

                        if (fileNode) {
                            images.push({
                                alt: null,
                                originalSrc: value,
                                localFile___NODE : fileNode.id
                            })
                        }
        
                        const content = {
                            key: node.key,
                            value: node.value,
                            valueType: node.valueType,
                            namespace: node.namespace,
                            images,
                            type: node.type
                        }
                        const childNode = createNode({
                            id: createNodeId(`my-data-${node.id}`),
                            ...content,
                            parent: null,
                            children: [],
                            internal: {
                            type: `BonifyMetafield`,
                            content: JSON.stringify(content),
                            contentDigest: createContentDigest(content),
                            },
                        });
        
                        createParentChildLink({ parent: node, child: childNode })
        
        
                        node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                    }
                }

            }

        }
        else if(node?.namespace === "custom_fields" && node?.valueType === "json_string"){
            const jsonParsedArray = JSON.parse(node?.value);
            let images= [];
            jsonParsedArray.forEach(async (parsedItem) => {
                for (const propertyItem in parsedItem) {
                    if(parsedItem[propertyItem] && Array.isArray(parsedItem[propertyItem])){
                        parsedItem[propertyItem].forEach(async (parsedLevelDeepItem) => {
                            for (const propertyLevelItem in parsedLevelDeepItem) {
                                if(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(parsedLevelDeepItem[propertyLevelItem])){

                                    if(parsedLevelDeepItem[propertyLevelItem].includes("<img")){
                                        const imgUrl = parsedLevelDeepItem[propertyLevelItem].split('"')[1];
                                        const altText = parsedLevelDeepItem[propertyLevelItem].split('"')[3] || null;
                                        const fileNode = await createRemoteFileNode({
                                            url: imgUrl,
                                            parentNodeId: node.id,
                                            createNode,
                                            createNodeId,
                                            getCache,
                                        })
        
                                        if (fileNode) {
                                            images.push({
                                                key: parsedItem,
                                                alt: altText,
                                                originalSrc: imgUrl,
                                                localFile___NODE : fileNode.id
                                            })
                                        }
                        
                                        const content = {
                                            key: node.key,
                                            value: node.value,
                                            valueType: node.valueType,
                                            namespace: node.namespace,
                                            images,
                                            type: node.type
                                        }
                                        const childNode = createNode({
                                            id: createNodeId(`my-data-${node.id}`),
                                            ...content,
                                            parent: null,
                                            children: [],
                                            internal: {
                                            type: `BonifyMetafield`,
                                            content: JSON.stringify(content),
                                            contentDigest: createContentDigest(content),
                                            },
                                        });
                        
                                        createParentChildLink({ parent: node, child: childNode })
                        
            
                        
                                        node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                        
                                    }
                                    else if(parsedLevelDeepItem[propertyLevelItem].includes("<a")){
                                        const imgUrl = parsedLevelDeepItem[propertyLevelItem].split('"')[1];
                                        const fileNode = await createRemoteFileNode({
                                            url: imgUrl,
                                            parentNodeId: node.id,
                                            createNode,
                                            createNodeId,
                                            getCache,
                                        })
        
                                        if (fileNode) {
                                            images.push({
                                                key: parsedItem,
                                                alt: null,
                                                originalSrc: imgUrl,
                                                localFile___NODE : fileNode.id
                                            })
                                        }
                        
                                        const content = {
                                            key: node.key,
                                            value: node.value,
                                            valueType: node.valueType,
                                            namespace: node.namespace,
                                            images,
                                            type: node.type
                                        }
                                        const childNode = createNode({
                                            id: createNodeId(`my-data-${node.id}`),
                                            ...content,
                                            parent: null,
                                            children: [],
                                            internal: {
                                            type: `BonifyMetafield`,
                                            content: JSON.stringify(content),
                                            contentDigest: createContentDigest(content),
                                            },
                                        });
                        
                                        createParentChildLink({ parent: node, child: childNode })
                        
            
                        
                                        node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                        
                                    }
                                    else{
        
                                        if(parsedLevelDeepItem[propertyLevelItem] && parsedLevelDeepItem[propertyLevelItem] !== null){
                                            fileNode = await createRemoteFileNode({
                                                url: parsedLevelDeepItem[propertyLevelItem],
                                                parentNodeId: node.id,
                                                createNode,
                                                createNodeId,
                                                getCache,
                                            })
                    
                                            if (fileNode) {
                                                images.push({
                                                    key: parsedItem,
                                                    alt: null,
                                                    originalSrc: parsedLevelDeepItem[propertyLevelItem],
                                                    localFile___NODE : fileNode.id
                                                })
                                            }
                            
                                            const content = {
                                                key: node.key,
                                                value: node.value,
                                                valueType: node.valueType,
                                                namespace: node.namespace,
                                                images,
                                                type: node.type
                                            }
                                            const childNode = createNode({
                                                id: createNodeId(`my-data-${node.id}`),
                                                ...content,
                                                parent: null,
                                                children: [],
                                                internal: {
                                                type: `BonifyMetafield`,
                                                content: JSON.stringify(content),
                                                contentDigest: createContentDigest(content),
                                                },
                                            });
                            
                                            createParentChildLink({ parent: node, child: childNode })
                            
                
                            
                                            node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                                        }
                                    }
                                }
                            }
                        })
                    }
                    else if(parsedItem[propertyItem] && parsedItem[propertyItem].substring(0, 1) !== "["){

                        if(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(parsedItem[propertyItem])){

                            if(parsedItem[propertyItem].includes("<img")){
                                const imgUrl = parsedItem[propertyItem].split('"')[1];
                                const altText = parsedItem[propertyItem].split('"')[3] || null;
                                const fileNode = await createRemoteFileNode({
                                    url: imgUrl,
                                    parentNodeId: node.id,
                                    createNode,
                                    createNodeId,
                                    getCache,
                                })

                                if (fileNode) {
                                    images.push({
                                        key: parsedItem,
                                        alt: altText,
                                        originalSrc: imgUrl,
                                        localFile___NODE : fileNode.id
                                    })
                                }
                
                                const content = {
                                    key: node.key,
                                    value: node.value,
                                    valueType: node.valueType,
                                    namespace: node.namespace,
                                    images,
                                    type: node.type
                                }
                                const childNode = createNode({
                                    id: createNodeId(`my-data-${node.id}`),
                                    ...content,
                                    parent: null,
                                    children: [],
                                    internal: {
                                    type: `BonifyMetafield`,
                                    content: JSON.stringify(content),
                                    contentDigest: createContentDigest(content),
                                    },
                                });
                
                                createParentChildLink({ parent: node, child: childNode })
                
    
                
                                node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                
                            }
                            else if(parsedItem[propertyItem].includes("<a")){
                                const imgUrl = parsedItem[propertyItem].split('"')[1];
                                const fileNode = await createRemoteFileNode({
                                    url: imgUrl,
                                    parentNodeId: node.id,
                                    createNode,
                                    createNodeId,
                                    getCache,
                                })

                                if (fileNode) {
                                    images.push({
                                        key: parsedItem,
                                        alt: null,
                                        originalSrc: imgUrl,
                                        localFile___NODE : fileNode.id
                                    })
                                }
                
                                const content = {
                                    key: node.key,
                                    value: node.value,
                                    valueType: node.valueType,
                                    namespace: node.namespace,
                                    images,
                                    type: node.type
                                }
                                const childNode = createNode({
                                    id: createNodeId(`my-data-${node.id}`),
                                    ...content,
                                    parent: null,
                                    children: [],
                                    internal: {
                                    type: `BonifyMetafield`,
                                    content: JSON.stringify(content),
                                    contentDigest: createContentDigest(content),
                                    },
                                });
                
                                createParentChildLink({ parent: node, child: childNode })
                
    
                
                                node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                
                            }
                            else{

                                if(parsedItem[propertyItem] && parsedItem[propertyItem] !== null){
                                    fileNode = await createRemoteFileNode({
                                        url: parsedItem[propertyItem],
                                        parentNodeId: node.id,
                                        createNode,
                                        createNodeId,
                                        getCache,
                                    })
            
                                    if (fileNode) {
                                        images.push({
                                            key: parsedItem,
                                            alt: null,
                                            originalSrc: parsedItem[propertyItem],
                                            localFile___NODE : fileNode.id
                                        })
                                    }
                    
                                    const content = {
                                        key: node.key,
                                        value: node.value,
                                        valueType: node.valueType,
                                        namespace: node.namespace,
                                        images,
                                        type: node.type
                                    }
                                    const childNode = createNode({
                                        id: createNodeId(`my-data-${node.id}`),
                                        ...content,
                                        parent: null,
                                        children: [],
                                        internal: {
                                        type: `BonifyMetafield`,
                                        content: JSON.stringify(content),
                                        contentDigest: createContentDigest(content),
                                        },
                                    });
                    
                                    createParentChildLink({ parent: node, child: childNode })
                    
        
                    
                                    node.bonifyFields___NODE = createNodeId(`my-data-${node.id}`)
                                }
                            }
                        }
                    }
                }
            })
        }
    }
}