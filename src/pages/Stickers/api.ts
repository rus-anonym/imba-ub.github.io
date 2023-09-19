import { Static, Type } from "@sinclair/typebox";

const userStickersPacksInfoBox = Type.Object({
    user: Type.Object({
        id: Type.Number(),
        fullName: Type.String(),
        avatar: Type.String()
    }),
    stickers: Type.Array(
        Type.Object({
            id: Type.Number(),
            title: Type.String(),
            description: Type.String(),
            author: Type.String(),
            thumbs: Type.Array(Type.Number()),
            price: Type.Number(),
            url: Type.String(),
            demoPhotosCount: Type.Number(),
            styles: Type.Array(Type.Number()),
            previews: Type.Array(Type.Tuple([Type.Number(), Type.Number()])),
            hasBackground: Type.Boolean(),
            isAnimated: Type.Boolean(),
            isNotAvailable: Type.Boolean()
        })
    ),
    totalPrice: Type.Number(),
    accessKey: Type.String()
});
type TUserStickersPacksInfo = Static<typeof userStickersPacksInfoBox>;

const backgroundType = Type.Object({
    type: Type.Literal("background")
});
const thumbType = Type.Object({
    type: Type.Literal("thumb"),
    size: Type.String()
});
const previewType = Type.Object({
    type: Type.Literal("preview"),
    width: Type.String(),
    height: Type.String()
});
const demoPhotoType = Type.Object({
    type: Type.Literal("demo_photo"),
    index: Type.String()
});
const assetsTypes = Type.Union([
    backgroundType,
    thumbType,
    previewType,
    demoPhotoType
]);
type TAssetsType = Static<typeof assetsTypes>;
const getAssetsPath = ({
    accessKey,
    packId,
    type
}: {
    accessKey: string;
    packId: number;
    type: TAssetsType;
}): string => {
    const url = `https://dev-api.imbabot.ru/stickers/static/${packId}`;
    const params = new URLSearchParams({
        accessKey,
        ...type
    });
    return url + `?${params.toString()}`;
};

export type { TAssetsType, TUserStickersPacksInfo };

export { getAssetsPath, userStickersPacksInfoBox };
