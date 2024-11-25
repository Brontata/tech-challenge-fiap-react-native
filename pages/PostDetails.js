import React from 'react';
import PostDetailsView from '../components/PostDetailsView';

const PostDetails = ({ route, navigation }) => {
    const { post } = route.params;

    return (
        <PostDetailsView navigation={navigation} route={route} post={post} admin={true} />
    );
}

export default PostDetails;

