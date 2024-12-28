import {
    Group,
    Placeholder,
    Spinner,
    useAdaptivityWithJSMediaQueries
} from "@vkontakte/vkui";

const LoadingPlaceholder = () => {
    const { isDesktop } = useAdaptivityWithJSMediaQueries();

    if (isDesktop) {
        return (
            (<Group>
                <Placeholder>
                    <Spinner size="xl" />
                </Placeholder>
            </Group>)
        );
    }

    return (
        (<Placeholder stretched>
            <Spinner size="xl" />
        </Placeholder>)
    );
};

export default LoadingPlaceholder;
