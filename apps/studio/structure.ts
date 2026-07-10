import {
  type OrderableListConfig,
  orderableDocumentListDeskItem,
} from "@sanity/orderable-document-list";
import {
  BadgeDollarSign,
  BookMarked,
  Building2,
  CogIcon,
  File,
  FileText,
  Handshake,
  HomeIcon,
  type LucideIcon,
  MessageCircleQuestion,
  PanelBottomIcon,
  PanelTopDashedIcon,
  Settings2,
  User,
  Waves,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import type { SchemaType, SingletonType } from "./schemaTypes";
import { getTitleCase } from "./utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? File);
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
};

const createIndexList = ({ S, index, list }: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);
  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? File)
    .child(
      S.list()
        .title(indexTitle)
        .items([
          S.listItem()
            .title(indexTitle)
            .icon(index.icon ?? File)
            .child(
              S.document()
                .views([S.view.form()])
                .schemaType(index.type)
                .documentId(index.type),
            ),
          S.documentTypeListItem(list.type)
            .title(`${listTitle}`)
            .icon(list.icon ?? File),
        ]),
    );
};

function createOrderableList(
  S: StructureBuilder,
  context: StructureResolverContext,
  params: Omit<OrderableListConfig, "S" | "context">,
) {
  return orderableDocumentListDeskItem({
    S,
    context,
    ...params,
  });
}

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HomeIcon }),
      S.divider(),

      S.listItem()
        .title("Content")
        .icon(FileText)
        .child(
          S.list()
            .title("Content")
            .items([
              createList({ S, type: "page", title: "Pages" }),
              createIndexList({
                S,
                index: {
                  type: "blogIndex",
                  icon: BookMarked,
                  title: "Blog Index",
                },
                list: { type: "blog", title: "Posts", icon: FileText },
              }),
              createList({
                S,
                type: "faq",
                title: "FAQs",
                icon: MessageCircleQuestion,
              }),
            ]),
        ),

      S.listItem()
        .title("Club")
        .icon(Waves)
        .child(
          S.list()
            .title("Club")
            .items([
              createOrderableList(S, context, {
                type: "program",
                title: "Programs",
                icon: Waves,
              }),
              S.listItem()
                .title("People")
                .icon(User)
                .child(
                  S.list()
                    .title("People")
                    .items([
                      createOrderableList(S, context, {
                        type: "staff",
                        id: "staff-coaching",
                        title: "Coaches",
                        icon: User,
                        filter:
                          'role == "coaching" || (!defined(role) && tier in ["head", "assistant"])',
                      }),
                      createOrderableList(S, context, {
                        type: "staff",
                        id: "staff-board",
                        title: "Board / Leadership",
                        icon: User,
                        filter: 'role == "board"',
                      }),
                      createOrderableList(S, context, {
                        type: "staff",
                        id: "staff-operations",
                        title: "Operations",
                        icon: User,
                        filter:
                          'role == "operations" || (!defined(role) && tier == "staff")',
                      }),
                      createOrderableList(S, context, {
                        type: "staff",
                        id: "staff-all",
                        title: "All People",
                        icon: User,
                      }),
                    ]),
                ),
              createOrderableList(S, context, {
                type: "facility",
                title: "Facilities",
                icon: Building2,
              }),
            ]),
        ),

      S.listItem()
        .title("Partners")
        .icon(Handshake)
        .child(
          S.list()
            .title("Partners")
            .items([
              createList({
                S,
                type: "sponsor",
                title: "Sponsors",
                icon: Handshake,
              }),
              createOrderableList(S, context, {
                type: "sponsorLevel",
                title: "Sponsor Levels",
                icon: BadgeDollarSign,
              }),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Site Configuration")
        .icon(Settings2)
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              createSingleTon({
                S,
                type: "navbar",
                title: "Navigation",
                icon: PanelTopDashedIcon,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: "Footer",
                icon: PanelBottomIcon,
              }),
              createSingleTon({
                S,
                type: "settings",
                title: "Global Settings",
                icon: CogIcon,
              }),
            ]),
        ),
    ]);
};
