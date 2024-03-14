import Markdown from 'markdown-to-jsx'
import React, { useEffect, useState } from 'react'
import Code from './Code';

import { posts } from '../posts';

const Post = () => {
    return (
        <article className="article">
            {posts.map((post) => {
                return (
                    <div className="container">
                        <div className="post-wrapper">
                            <h2>{post.title}</h2>
                            <Markdown options={{
                                overrides: {
                                    Code: {
                                        component: Code
                                    }
                                }
                            }}>
                                {post.body}
                            </Markdown>
                        </div>
                    </div>
                )
            })}
        </article>
    )
}

export default Post